'use client';

import MultipleImageInput from '@/components/MultipleImageInput';
import {
  useEdificacao,
  useEdificacoes,
  usePonto,
  usePontos,
} from '@/utils/api/client_side_consumer';
import { consumerSolicitacao } from '@/utils/api/consumerSolicitacao';
import { getCookie } from '@/utils/cookies';
import { ImageIn, SolicitacaoIn, TIPOS_PONTOS } from '@/utils/types';
import { useEffect, useState } from 'react';

export default function CriarSolicitacao() {
  const edificacoes = useEdificacoes();
  const [codEdificacao, setCodEdificacao] = useState<string>('');
  const edificacao = useEdificacao(codEdificacao);
  const [idPonto, setIdPonto] = useState<number>(0);
  const pontos = usePontos();
  const ponto = usePonto(idPonto);
  const filteredPontos = pontos.filter(
    (ponto) => ponto.edificacao.codigo === codEdificacao,
  );
  const [tipoSolicitacao, setTipoSolicitacao] = useState<string>('-');

  const [images, setImages] = useState<ImageIn[]>([]);

  const [submiting, setSubmiting] = useState(false);

  interface solicitacao {
    objetivo: string;
    justificativa: string;
  }

  //TODO: Melhorar sistema de solicitações
  const objDefaultValue: Record<string, solicitacao> = {
    '': {
      objetivo: 'Selecione um tipo de solicitação.',
      justificativa: 'Selecione um tipo de solicitação.',
    },
    'Limpeza de reservatório': {
      objetivo:
        'Contribuir para a preservação da potabilidade da água para consumo humano da UFERSA.',
      justificativa:
        '- Comprovação da necessidade de limpeza do reservatório de água, a partir de amostragem de água no âmbito do projeto “Qualidade da água para consumo humano: estudo no sistema da UFERSA-Mossoró” (cadastro na PROPPG: PIB10009-2019).\n\n' +
        '- Preservação da potabilidade da água conforme previsto na NBR 5626/2020 (ABNT, 2020, p. 40)¹:\n' +
        '[...] “Todas as partes acessíveis dos componentes que têm contato com a água devem ser limpas periodicamente.” [...]\n\n' +
        'Obs.: Para limpeza de reservatório de água, recomenda-se o procedimento especificado no Anexo F da NBR 5626/2020.',
    },
    'Instalação de ponto de coleta': {
      objetivo:
        'Possibilitar a coleta de água a montante do reservatório superior.',
      justificativa:
        'Verificação no local com apoio do encanador, assim como, comprovação da necessidade de existência de ponto de coleta de água, a partir de amostragem de água no âmbito do projeto “Qualidade da água para consumo humano: estudo no sistema da UFERSA-Mossoró” (cadastro na PROPPG: PIB10009- 2019).\n',
    },
    'Conserto de reservatório': {
      objetivo:
        'Contribuir para a proteção sanitária e preservação da potabilidade da água para consumo humano na UFERSA.',
      justificativa:
        'Verificação no local e comprovação da necessidade de substituição ou conserto da tampa do reservatório de água inferior, a partir de amostragem de água no âmbito do projeto “Qualidade da água para consumo humano: estudo no sistema da UFERSA-Mossoró” (cadastro na PROPPG: PIB10009-2019).\n\n' +
        '- Proteção sanitária e preservação da potabilidade de água conforme previsto na NBR 5626/2020 (ABNT, 2020, p. 14) ¹:\n' +
        '[...] “O reservatório deve ser um recipiente estanque, com tampa ou abertura\n' +
        'com porta de acesso, opaca, firmemente presa na sua posição quando fechada.”\n\n' +
        '- Preservação da potabilidade da água conforme previsto na NBR 5626/2020 (ABNT, 2020, p. 40):\n' +
        '[...] “Deve-se fazer uma verificação periódica para se assegurar que as tampas dos reservatórios estão posicionadas e fixadas nos locais corretos e impedem o ingresso de corpos estranhos ou água de outras fontes no reservatório.” [...]\n\n' +
        '- O padrão de potabilidade da água para consumo humano é estabelecido em\n' +
        'Portaria do Ministério da Saúde² ³ ⁴;',
    },
  };

  useEffect(() => {
    if (edificacao?.imagens) {
      // setImages(edificacao?.imagens);
    }
  }, [edificacao]);

  async function uploadImage(id_solicitacao: string, image: ImageIn) {
    // Set request headers
    const headers: HeadersInit = {};

    // Try to get the csrftoken in the cookies
    const csrfToken = getCookie('csrftoken');

    if (csrfToken) {
      headers['X-CSRFToken'] = csrfToken;
    }

    let formData = new FormData();
    formData.append('description', image.description);

    if (image.file) formData.append('file', image.file);

    let response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/solicitacoes/${id_solicitacao}/imagem`,
      {
        method: 'POST',
        headers: headers,
        credentials: 'include',
        body: formData,
      },
    );

    if (!response.ok) {
      alert(`Erro ao adicionar imagem ${image.file.name}`);
    }
  }

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmiting(true);

    const formData = new FormData(event.currentTarget);

    const data: SolicitacaoIn = {
      ponto_id: idPonto,
      tipo: tipoSolicitacao,
      objetivo: formData.get('objetivo') as string | null,
      justificativa: formData.get('justificativa') as string | null,
      status: formData.get('status') as string,
    };

    const response = await consumerSolicitacao.post(data);

    if (response.status != 200) {
      alert('Erro ao criar solicitação.');
      setSubmiting(false);
      return;
    } else {
      alert('Solicitação criada com sucesso!');
    }

    // If the creation was well succeded, then upload the images
    // and attach to the "solicitacao".
    const solicitacao = await response.json();

    await Promise.all(
      images.map((image) => {
        return uploadImage(solicitacao.id, image);
      }),
    );

    alert('Imagens criadas.');
    window.location.href = '/admin/solicitacoes';
  };

  return (
    <>
      <h2 className="mb-8 text-4xl font-bold text-neutral-700">
        Criar solicitação
      </h2>
      <form
        onSubmit={submitForm}
        method="POST"
        className="flex w-full flex-col gap-2"
      >
        <label htmlFor="tipo">Tipo de solicitação</label>
        <select
          required
          name="tipo"
          onChange={(e) => setTipoSolicitacao(e.target.value)}
          className="w-full rounded-md border border-neutral-200 px-6 py-4 disabled:bg-neutral-200 disabled:text-neutral-500"
        >
          <option>-</option>
          <option value="Limpeza de reservatório">
            Solicitação de limpeza de reservatório
          </option>
          <option value="Instalação de ponto de coleta">
            Solicitação de instalação de ponto de coleta
          </option>
          <option value="Conserto de reservatório">
            Solicitação de conserto de tampa de reservatório
          </option>
        </select>

        <label className="edificacao">Edificação</label>
        <div className="flex">
          <select
            required
            name="edificacao"
            onChange={(e) => setCodEdificacao(e.target.value)}
            defaultValue={'-'}
            className="w-full rounded-md border border-neutral-200 px-6 py-4 disabled:bg-neutral-200 disabled:text-neutral-500"
          >
            <option value="-" disabled selected>
              -
            </option>
            {edificacoes.map((edificacao) => (
              <option value={edificacao.codigo} key={edificacao.codigo}>
                {' '}
                {edificacao.codigo} - {edificacao.nome}{' '}
              </option>
            ))}
          </select>
          <a
            className="flex justify-center"
            href={edificacao ? '/admin/edificacoes/' + codEdificacao : '#'}
            target={edificacao ? '_blank' : '_self'}
          >
            <svg
              className={
                edificacao
                  ? `mx-4 w-6 fill-primary-600`
                  : `mx-4 w-6 fill-neutral-500`
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
        </div>

        <label>Ponto</label>
        <div className="flex">
          <select
            required
            name="ponto"
            onChange={(e) => setIdPonto(parseInt(e.target.value))}
            className="w-full rounded-md border border-neutral-200 px-6 py-4 disabled:bg-neutral-200 disabled:text-neutral-500"
          >
            <option value="" disabled selected>
              -
            </option>
            {filteredPontos.map((ponto) => (
              <option value={ponto.id} key={ponto.id}>
                {ponto.id} - {TIPOS_PONTOS[ponto.tipo]} - {ponto.localizacao}
              </option>
            ))}
          </select>

          <a
            className="flex justify-center"
            href={ponto ? '/admin/pontos/' + idPonto : '#'}
            target={ponto ? '_blank' : '_self'}
          >
            <svg
              className={
                ponto
                  ? `mx-4 w-6 fill-primary-600`
                  : `mx-4 w-6 fill-neutral-500`
              }
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
            </svg>
          </a>
        </div>

        <label htmlFor="objetivo">Objetivo do serviço solicitado</label>
        <textarea
          name="objetivo"
          rows={8}
          defaultValue={objDefaultValue[tipoSolicitacao]?.objetivo || ''}
          className="w-full rounded border border-neutral-300 px-4 py-2"
        />

        <label htmlFor="justificativa">Justificativa da solicitação</label>
        <textarea
          name="justificativa"
          rows={10}
          defaultValue={objDefaultValue[tipoSolicitacao]?.justificativa || ''}
          className="w-full rounded border border-neutral-300 px-4 py-2"
        />

        <label htmlFor="imagens">Imagens:</label>
        <MultipleImageInput
          images={images}
          setImages={setImages}
          disabled={false}
        />

        <label htmlFor="status">Status: </label>
        <select
          required
          name="status"
          defaultValue="Pendente"
          className="w-full rounded-md border border-neutral-200 px-6 py-4 disabled:bg-neutral-200 disabled:text-neutral-500"
        >
          <option>-</option>
          <option value="Pendente">Pendente</option>
          <option value="Em andamento">Em andamento</option>
          <option value="Concluído">Concluído</option>
        </select>

        <input
          type="submit"
          value={submiting ? 'Enviando...' : '+ Criar Solicitação'}
          className="flex w-full items-center justify-center rounded border border-green-600 bg-green-500 px-6 py-4 font-semibold text-white hover:bg-green-600 disabled:bg-green-800"
          disabled={submiting}
        />
      </form>
    </>
  );
}
