import { ImageType } from '@/types/Image';
import { APIConsumer, apiUrl } from '@/utils/api/APIConsumer';
import { EdificacaoIn } from '@/utils/types';

export async function uploadImage(codigo_edificacao: string, image: ImageType) {
  const csrftoken = localStorage.getItem('csrftoken') || '';
  const formData = new FormData();
  formData.append('description', image.description);
  formData.append('file', image.file);

  const response = await fetch(
    `${apiUrl}/api/v1/edificacoes/${codigo_edificacao}/imagem`,
    {
      headers: {
        'X-CSRFToken': csrftoken,
      },
      credentials: 'include',
      method: 'POST',
      body: formData,
    },
  );

  if (!response.ok) {
    throw `Erro ao adicionar imagem ${image.file.name}`;
  }
}

export async function createEdificacao(
  edificacao: EdificacaoIn,
  images: ImageType[] = [],
) {
  const consumer = new APIConsumer(`${apiUrl}/api/v1/edificacoes/`);
  const response = await consumer.post(edificacao);

  if (!response.ok) {
    alert('Erro ao criar edificação!');
  } else {
    alert('Edificação criada.');
  }

  await Promise.all(
    images.map((image) => {
      return uploadImage(edificacao.codigo, image);
    }),
  );
}
