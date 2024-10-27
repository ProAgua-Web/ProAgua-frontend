'use client';

import { useEdificacao } from '@/utils/api/client_side_consumer';
import { apiUrl } from '@/utils/api/APIConsumer';
import { consumerEdficacao } from '@/utils/api/consumerEdficacao';
import { APIConsumer } from '@/utils/api/APIConsumer';
import { FormEvent, useEffect, useState } from 'react';
import MultipleImageInput from '@/components/MultipleImageInput';
import { EdificacaoIn, ImageIn, ImageOut } from '@/utils/types';

export default function VisualizarEdificacao({
  params,
}: {
  params: { codigo_edificacao: string };
}) {
  const edificacao = useEdificacao(params.codigo_edificacao);
  const [existingImages, setExistingImages] = useState<ImageOut[]>([]);
  const [images, setImages] = useState<ImageIn[]>([]);
  const [editable, setEditable] = useState<Boolean>(false);

  useEffect(() => {
    if (edificacao?.imagens) {
      setExistingImages(edificacao.imagens);
    }
  }, [edificacao]);

  async function removeExistingImage(url: string) {
    const image = existingImages.find((e) => apiUrl + e.src === url);

    if (!image) {
      throw 'Não foi possível excluir a imagem';
    }

    // Send request to delete image
    const consumer = new APIConsumer(
      `${apiUrl}/api/v1/edificacoes/${edificacao?.codigo}/imagem/`,
    );
    const response = await consumer.delete(String(image?.id));

    if (!response.ok) {
      throw 'Não foi possível excluir a imagem';
    }

    // Remove image from array
    setExistingImages(
      existingImages.filter((image) => apiUrl + image.src != url),
    );
  }

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: EdificacaoIn = {
      codigo: String(formData.get('codigo')),
      nome: String(formData.get('nome')),
      campus: String(formData.get('campus')),
      cronograma: Number(formData.get('cronograma')),
      informacoes_gerais: String(formData.get('informacoes_gerais')),
    };
    const response = await consumerEdficacao.put(
      params.codigo_edificacao,
      data,
    );

    if (response.status == 200) {
      alert('Edificação atualizada com sucesso!');
      window.location.href = '/admin/pontos';
    } else {
      alert('Erro ao atualizar edificação!');
    }

    if (images.length > 0) {
      await Promise.all(images.map((image) => uploadImage(image)));
    }
  }

  async function uploadImage(image: ImageIn) {
    let formData = new FormData();
    formData.append('description', image.description);
    formData.append('file', image.file);

    const consumer = new APIConsumer(
      `${apiUrl}/api/v1/edificacoes/${edificacao?.codigo}/imagem`,
    );
    const response = await consumer.post(formData, new Headers());

    if (!response.ok) {
      throw `Erro ao adicionar imagem ${image.file.name}`;
    }
  }

  async function deleteEdificacao() {
    const response = await consumerEdficacao.delete(params.codigo_edificacao);
    if (response.status == 200) {
      alert('Edificação deletada!');
      window.location.href = '/admin/pontos';
    } else {
      alert('Erro ao deletar edificação!');
    }
  }

  return (
    <>
      <h2 className="mb-8 text-4xl font-bold text-neutral-700">
        {editable ? 'Editar' : 'Visualizar'} Edificação
      </h2>
      <form
        onSubmit={(e) => submitForm(e)}
        onReset={() => {
          setEditable(false);
        }}
        method="PUT"
        className="flex w-full flex-col gap-4"
      >
        <label htmlFor="codigo">Código:</label>
        <input
          type="text"
          id="codigo"
          name="codigo"
          className="rounded-md border border-neutral-200 px-6 py-4 disabled:bg-neutral-200 disabled:text-neutral-500"
          defaultValue={edificacao?.codigo}
          disabled={!editable}
        />

        <label htmlFor="nome">Nome:</label>
        <input
          type="text"
          id="nome"
          name="nome"
          className="rounded-md border border-neutral-200 px-6 py-4 disabled:bg-neutral-200 disabled:text-neutral-500"
          defaultValue={edificacao?.nome}
          disabled={!editable}
        />

        <label htmlFor="campus">Campus:</label>
        <select
          id="campus"
          name="campus"
          className="rounded-md border border-neutral-200 px-6 py-4 disabled:bg-neutral-200 disabled:text-neutral-500"
          defaultValue={edificacao?.campus}
          disabled={!editable}
        >
          <option value="LE">Leste</option>
          <option value="OE">Oeste</option>
        </select>

        <label htmlFor="cronograma">Cronograma:</label>
        <input
          type="number"
          id="cronograma"
          name="cronograma"
          className="rounded-md border border-neutral-200 px-6 py-4 disabled:bg-neutral-200 disabled:text-neutral-500"
          defaultValue={edificacao?.cronograma}
          disabled={!editable}
        />

        <label htmlFor="informacoes_gerais">
          Informações gerais dos reservatórios:
        </label>
        <textarea
          id="informacoes_gerais"
          name="informacoes_gerais"
          className="rounded-lg border border-neutral-200 px-6 py-4 disabled:bg-neutral-200 disabled:text-neutral-500"
          rows={4}
          placeholder="Informações gerais sobre a edificação..."
          defaultValue={edificacao?.informacoes_gerais}
          disabled={!editable}
        ></textarea>

        <label htmlFor="foto">Imagem:</label>
        <MultipleImageInput
          images={images}
          setImages={setImages}
          existingImages={existingImages}
          removeExistingImage={removeExistingImage}
          disabled={!editable}
        />

        <input
          id="editar"
          type="submit"
          className={`rounded-lg border ${editable ? 'bg-green-500 hover:bg-green-600' : 'bg-primary-500 hover:bg-primary-600'} px-6 py-4 text-center font-semibold text-white`}
          onClick={(event) => {
            if (!editable) {
              event.preventDefault();
              setEditable(true);
            }
          }}
          value={editable ? 'Salvar' : 'Habilitar edição'}
        />

        <button
          type="button"
          className={`rounded-lg border bg-red-500 px-6 py-4 text-center font-semibold text-white hover:bg-red-600 disabled:bg-gray-400 disabled:text-gray-300 ${editable ? '' : 'hidden'}`}
          disabled={!editable}
          onClick={deleteEdificacao}
        >
          Excluir
        </button>

        {editable && (
          <>
            <input
              type="reset"
              className={`rounded-lg border bg-gray-500 px-6 py-4 text-center font-semibold text-white hover:bg-gray-600`}
              value="Cancelar"
            ></input>
          </>
        )}
      </form>
    </>
  );
}
