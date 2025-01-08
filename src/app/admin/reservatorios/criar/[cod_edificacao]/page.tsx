'use client';

import MultipleImageInput from '@/components/MultipleImageInput';
import { APIConsumer, apiUrl } from '@/utils/api/APIConsumer';
import { usePontos } from '@/utils/api/client_side_consumer';
import { consumerEdficacao } from '@/utils/api/consumerEdficacao';
import { consumerPonto } from '@/utils/api/consumerPonto';
import {
  Edificacao,
  ImageIn,
  Ponto,
  PontoIn,
  TIPOS_PONTOS,
} from '@/utils/types';
import { FormEvent, useEffect, useState } from 'react';

export default function CriarPonto({
  params,
}: {
  params: { cod_edificacao: string };
}) {
  const [edificacoes, setEdificacoes] = useState<Edificacao[]>([]);
  const pontos = usePontos();

  const [currentAmontante, setCurrentAmontante] = useState<string>('');
  const [currentEdificacao, setCurrentEdificacao] = useState<string>('');
  const [currentTipo, setCurrentTipo] = useState<string>('1');
  const pontosAmontantes = pontos.filter(
    (ponto) => ponto.tipo > Number(currentTipo),
  );
  const [images, setImages] = useState<ImageIn[]>([]);
  const [submiting, setSubmiting] = useState<boolean>(false);

  async function uploadImage(id_ponto: string, image: ImageIn) {
    let formData = new FormData();
    formData.append('description', image.description);
    formData.append('file', image.file);

    const consumer = new APIConsumer(`${apiUrl}/pontos/${id_ponto}/imagem`);
    const response = await consumer.post(formData, new Headers());

    if (!response.ok) {
      throw `Erro ao adicionar imagem ${image.file.name}`;
    }
  }

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSubmiting(true);

    const formData = new FormData(event.currentTarget);

    let amontante = formData.get('amontante');

    const data: PontoIn = {
      codigo_edificacao: formData.get('edificacao') as string,
      localizacao: formData.get('localizacao') as string,
      tombo: formData.get('tombo') as string | null,
      tipo: Number(formData.get('tipo')),
      amontante: amontante ? Number(amontante) : null,
      // imagem: null,
    };

    const response = await consumerPonto.post(data);

    if (response.status === 200) {
      const responseData = await response.json();
      const id = responseData.id;

      if (images.length > 0) {
        await Promise.all(images.map((image) => uploadImage(id, image)));
      }

      alert('Ponto de coleta criado com sucesso!');
      window.location.href = '/admin/pontos';
    } else {
      throw 'Erro ao criar ponto de coleta';
    }

    setSubmiting(false);
  }

  useEffect(() => {
    consumerEdficacao
      .list('no-cache', { limit: 10000 })
      .then((data) => setEdificacoes(data));
  }, []);

  return (
    <>
      <h1 className="mb-8 text-4xl font-bold text-neutral-700">
        Criar Reservatório
      </h1>
      <form
        className="flex w-full flex-col gap-4"
        onSubmit={(e) => submitForm(e)}
        method="POST"
      >
        {edificacoes.length > 0 && (
          <>
            <label htmlFor="">Edificação:</label>

            <div className="flex">
              <select
                id="edificacao"
                name="edificacao"
                className="w-full rounded-lg border border-neutral-400 px-6 py-4"
                onChange={(e) => setCurrentEdificacao(e.target.value)}
                defaultValue={params.cod_edificacao}
              >
                <option value="">-</option>
                {edificacoes.map((edificacao: Edificacao) => {
                  return (
                    <option value={edificacao.codigo} key={edificacao.codigo}>
                      {edificacao.codigo} - {edificacao.nome}
                    </option>
                  );
                })}
              </select>

              <a
                className="flex justify-center"
                href={
                  currentEdificacao
                    ? '/admin/edificacoes/' + currentEdificacao
                    : '#'
                }
                target={currentEdificacao ? '_blank' : '_self'}
              >
                <svg
                  className={
                    currentEdificacao
                      ? `mx-2 w-6 fill-primary-600`
                      : `mx-2 w-6 fill-neutral-500`
                  }
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path
                    d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.
                        2 3.3 20.3z"
                  />
                </svg>
              </a>
              <a
                className="flex justify-center"
                href="/admin/edificacoes/criar"
                target="_blank"
              >
                <svg
                  className="mx-2 w-6 fill-primary-600"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                </svg>
              </a>
            </div>
          </>
        )}

        <label htmlFor="tipo">Tipo:</label>
        <select
          id="tipo"
          name="tipo"
          className="rounded-lg border border-neutral-400 px-6 py-4"
          onChange={(currentTipo) => setCurrentTipo(currentTipo.target.value)}
        >
          <option value="2">Reservatório Predial Superior</option>
          <option value="3">Reservatório Predial Inferior</option>
          <option value="4">Reservatório de Distribuição Superior</option>
          <option value="5">Reservatório de Distribuição Inferior</option>
          <option value="6">CAERN</option>
        </select>

        <label htmlFor="quantidade">Quantidade de Reservatórios:</label>
        <select
          id="quantidade"
          name="quantitdade"
          className="rounded-lg border border-neutral-400 px-6 py-4"
        >
          <option value="1">1 Reservatório</option>
          <option value="2">2 Reservatórios Interligados</option>
          <option value="3">3 Reservatórios Interligados</option>
        </select>

        <label htmlFor="">Localizacão:</label>
        <input
          type="text"
          id="localizacao"
          name="localizacao"
          placeholder="Torneira na tubulação de entrada ao RPS, na fachada de trás do prédio"
          className="rounded-lg border border-neutral-400 px-6 py-4"
        />

        <label htmlFor="">Ponto a montante (Abastece):</label>
        <div className="flex">
          <select
            id="amontante"
            name="amontante"
            className="w-full rounded-lg border border-neutral-400 px-6 py-4"
            onChange={(e) => setCurrentAmontante(e.target.value)}
          >
            <option value="">-</option>
            {pontosAmontantes
              .filter((ponto) => (ponto.tipo = 1 + Number(currentTipo)))
              .map((ponto: Ponto) => {
                return (
                  <option value={ponto.id} key={ponto.id}>
                    {ponto.id} - {TIPOS_PONTOS[ponto.tipo]}
                    {ponto.localizacao &&
                    ponto.localizacao.trim() != '-' &&
                    ponto.localizacao.trim() != 'nan' &&
                    ponto.localizacao.trim() != ''
                      ? '- ' + ponto.localizacao
                      : ''}
                    {ponto.tombo &&
                    ponto.tombo.trim() != '-' &&
                    ponto.tombo.trim() != 'nan' &&
                    ponto.tombo.trim()
                      ? '- ' + ponto.tombo
                      : ''}
                  </option>
                );
              })}
          </select>

          <a
            className="flex justify-center"
            href={currentAmontante ? '/admin/pontos/' + currentAmontante : '#'}
            target={currentAmontante ? '_blank' : '_self'}
          >
            <svg
              className={
                currentAmontante
                  ? `mx-2 w-6 fill-primary-600`
                  : `mx-2 w-6 fill-neutral-500`
              }
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
            </svg>
          </a>

          <a
            className="flex justify-center"
            href="/admin/pontos/criar"
            target="_blank"
          >
            <svg
              className="mx-2 w-6 fill-primary-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
            </svg>
          </a>
        </div>

        <label htmlFor="capacidade">Capacidade (L): </label>
        <input
          type="number"
          id="quantidade"
          name="quantidade"
          placeholder="1000"
          className="rounded-lg border border-neutral-400 px-6 py-4"
        />

        <label htmlFor="material">Material: </label>
        <input
          type="text"
          id="material"
          name="material"
          placeholder="Polietileno, alvenaria, fibra de vidro, etc."
          className="rounded-lg border border-neutral-400 px-6 py-4"
        />

        <label htmlFor="foto">Foto:</label>

        <MultipleImageInput images={images} setImages={setImages} />

        <div className="w-full">
          <input
            id="criar"
            type="submit"
            className={
              'w-full rounded-lg border border-neutral-400 bg-primary-500 px-6 py-4 font-semibold text-white hover:bg-primary-600 disabled:bg-neutral-200 disabled:text-neutral-500'
            }
            value={`${submiting ? 'Criando...' : 'Criar'}`}
            disabled={submiting}
          />
        </div>
      </form>
    </>
  );
}
