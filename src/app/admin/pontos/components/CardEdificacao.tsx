'use client';
import CardPonto, { AddCard } from '@/components/pontos/CardPontos';
import { type EdificacaoDto } from '@/core/components/edificacao/edificacao.model';
import { type PontoDto } from '@/core/components/ponto/ponto.model';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

export function CardEdificacao(props: {
  group: { edificacao: EdificacaoDto; pontos: PontoDto[] };
  collapsed: boolean;
}) {
  const { group } = props;
  const [collapsed, setCollapsed] = useState<boolean>(props.collapsed);

  return (
    <div
      className={`mb-4 rounded-lg border border-gray-300 bg-gray-50 transition-shadow duration-75 hover:shadow-lg ${collapsed && 'rounded border-t bg-gray-200'}`}
    >
      <div className="flex justify-between border-b border-gray-300 p-4 py-2">
        <button
          className="font-regular w-full px-2 py-4 text-start text-xl text-black"
          onClick={() => setCollapsed(!collapsed)}
        >
          {group.edificacao.codigo} - {group.edificacao.nome}
        </button>
        <a
          href={`/admin/edificacoes/${group.edificacao.codigo}`}
          className="p-4 text-neutral-500 hover:text-primary-600"
        >
          <FontAwesomeIcon
            icon={faPenToSquare}
            size="lg"
            className="font-light"
          />
        </a>
      </div>
      <div
        className={`flex flex-wrap gap-4 bg-gray-100 p-4 ${collapsed ? 'hidden' : ''}`}
      >
        {group.pontos.map((item, i) => (
          <CardPonto ponto={item} key={'ponto-' + i} publicCard={false} />
        ))}
        <AddCard cod_edificacao={group.edificacao.codigo} />
        <AddCard cod_edificacao={group.edificacao.codigo} tipo="reservatorio" />
      </div>
    </div>
  );
}
