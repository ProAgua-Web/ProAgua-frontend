import { api } from '@/lib/api';

export interface ImagemDto {
  id: string;
  src: string;
  description: string;
}

interface CreateImagemDto {
  description: string;
  file: File;
}

type Identifier = string | number;

interface ImageOptions {
  entityPath: string;
  identifier: Identifier;
}

/**
 * Verifica se um item é do tipo File
 */
function isFile(item: File | ImagemDto): item is File {
  return item instanceof File;
}

/**
 * Gerencia as mudanças entre imagens existentes e novas
 */
export function manageImageChanges(
  currentImages: Array<File | ImagemDto>,
  existingImages: ImagemDto[] = [],
) {
  // Imagens para deletar: existiam antes mas não estão mais no form
  const imagesToDelete = existingImages.filter(
    (existingImage) =>
      !currentImages.some(
        (currentImage) =>
          !isFile(currentImage) && currentImage.id === existingImage.id,
      ),
  );

  // Novas imagens para upload (tipo File)
  const imagesToCreate = currentImages.filter(isFile);

  return { imagesToDelete, imagesToCreate };
}

/**
 * Cria novas imagens para uma entidade
 */
export async function createImages(
  options: ImageOptions,
  images: Array<File | ImagemDto>,
) {
  const { entityPath, identifier } = options;

  for (const file of images) {
    if (isFile(file)) {
      const imageData: CreateImagemDto = {
        description: file.name,
        file,
      };

      await api.post(`/${entityPath}/${identifier}/imagem`, imageData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    }
  }
}

/**
 * Deleta imagens de uma entidade
 */
export async function deleteImages(options: ImageOptions, images: ImagemDto[]) {
  const { entityPath, identifier } = options;

  for (const image of images) {
    await api.delete(`/${entityPath}/${identifier}/imagem/${image.id}`);
  }
}

/**
 * Atualiza as imagens de uma entidade (combina criação e deleção)
 */
export async function updateImages(
  options: ImageOptions,
  currentImages: Array<File | ImagemDto>,
  existingImages: ImagemDto[] = [],
) {
  const { imagesToDelete, imagesToCreate } = manageImageChanges(
    currentImages,
    existingImages,
  );

  const operations: Promise<void>[] = [];

  if (imagesToDelete.length > 0) {
    operations.push(deleteImages(options, imagesToDelete));
  }

  if (imagesToCreate.length > 0) {
    operations.push(createImages(options, imagesToCreate));
  }

  await Promise.all(operations);
}

/**
 * Mescla duas listas de imagens, evitando duplicatas
 * @param imagensPrev - Lista de imagens existentes
 * @param incoming - Lista de imagens a serem mescladas
 * @returns - Lista mesclada de imagens
 */
export function mergeImagens(
  imagensPrev: Array<File | ImagemDto>,
  incoming: Array<File | ImagemDto>,
): Array<File | ImagemDto> {
  const allImagens = [...imagensPrev];

  for (const imagem of incoming) {
    const imagemExists = allImagens.find((img) => {
      return (
        isFile(imagem) ||
        (!isFile(img) && !isFile(imagem) && img.src === imagem.src)
      );
    });
    if (!imagemExists) {
      allImagens.push(imagem);
    }
  }

  return allImagens;
}
