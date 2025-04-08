import { api } from '@/lib/api';

export interface ImagemDto {
  id: string;
  src: string;
  description: string;
}

interface createImagemDto {
  description: string;
  file: File;
}

export async function createImagensEdificacao(
  codigo: string,
  imagens: Array<File | ImagemDto>,
) {
  for (const file of imagens) {
    if (file instanceof File) {
      const imagem: createImagemDto = {
        description: file.name,
        file,
      };
      await api.post(`/edificacoes/${codigo}/imagem`, imagem, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    }
  }
}

export async function deleteImagensEdificacao(
  codigo: string,
  imagens: Array<ImagemDto>,
) {
  for (const imagem of imagens) {
    await api.delete(`/edificacoes/${codigo}/imagem/${imagem.id}`);
  }
}

export function manageImageChanges(
  imagensForm: Array<File | ImagemDto>,
  imagensExistentes: ImagemDto[] = [],
) {
  // Imagens para deletar: existiam antes mas não estão mais no form
  const imagensToDelete = imagensExistentes.filter(
    (imagemExistente) =>
      !imagensForm.some(
        (imagemForm) =>
          !(imagemForm instanceof File) && imagemForm.id === imagemExistente.id,
      ),
  );

  // Novas imagens para upload (tipo File)
  const imagensToCreate = imagensForm.filter(
    (imagem): imagem is File => imagem instanceof File,
  );

  return { imagensToDelete, imagensToCreate };
}

export async function updateImagensEdificacao(
  codigo: string,
  imagensForm: Array<File | ImagemDto>,
  imagensExistentes: ImagemDto[],
) {
  const { imagensToDelete, imagensToCreate } = manageImageChanges(
    imagensForm,
    imagensExistentes,
  );

  const operations: Promise<void>[] = [];

  if (imagensToDelete.length > 0) {
    operations.push(deleteImagensEdificacao(codigo, imagensToDelete));
  }

  if (imagensToCreate.length > 0) {
    operations.push(createImagensEdificacao(codigo, imagensToCreate));
  }

  await Promise.all(operations);
}
