'use client';

import { useEffect, useState } from 'react';
import { Solicitacao } from '@/utils/types';
import { formatDate } from '@/utils/api/client_side_consumer';
import { consumerSolicitacao } from '@/utils/api/consumerSolicitacao';

export default function Solicitacoes() {
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([]);
  useEffect(() => {
    consumerSolicitacao.list().then((data) => setSolicitacoes(data));
  }, []);

  return (
    <>
      <h1 className="mb-4 text-3xl font-bold">Solicitações</h1>
      <div className="w-full rounded border border-neutral-300 bg-white p-4 shadow-lg">
        <ul>
          {solicitacoes.length > 0 &&
            solicitacoes.map((solicitacao) => (
              <li
                key={solicitacao.id}
                className="flex items-center justify-between border-b border-neutral-300 p-2 last:border-b-0"
              >
                {solicitacao.id} - Solicitação {solicitacao.tipo} -{' '}
                {formatDate(solicitacao.data)} - {solicitacao.status}
                <a
                  className="rounded border border-blue-500 px-4 py-2 text-blue-500"
                  href={'/admin/solicitacoes/' + solicitacao.id}
                >
                  Acessar
                </a>
              </li>
            ))}
        </ul>
      </div>
      <a
        href="/admin/solicitacoes/criar"
        className="flex w-full items-center justify-center rounded border border-green-600 bg-green-500 px-6 py-4 font-semibold text-white"
      >
        + Criar Solicitação
      </a>
    </>
  );
}
