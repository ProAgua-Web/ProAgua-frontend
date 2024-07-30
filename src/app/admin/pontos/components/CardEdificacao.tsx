"use client";
import CardPonto, { AddCard } from "@/components/pontos/CardPontos";
import { Edificacao, Ponto } from "@/utils/types";
import { useState, useEffect } from "react";

export function CardEdificacao(props: { group: { edificacao: Edificacao; pontos: Ponto[]; }; collapsed: boolean; }) {
  const { group } = props;
  const [collapsed, setCollapsed] = useState<boolean>(props.collapsed);

  useEffect(() => {
    setCollapsed(props.collapsed);
  }, [props.collapsed]);

  return (
    <div className="mb-2 rounded bg-gradient-to-b from-gray-100 to-gray-50 border border-gray-300">
      <div className="flex justify-between p-4 py-2">
        <button
          className="w-full text-xl text-start font-semibold text-black"
          onClick={() => setCollapsed(!collapsed)}>
          {group.edificacao.codigo} - {group.edificacao.nome}
        </button>
        <a href={`/admin/edificacoes/${group.edificacao.codigo}`} className="hover:text-primary-600">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg></a>
      </div>
      <div className={`p-4 flex gap-4 flex-wrap ${collapsed ? 'hidden' : ''}`}>
        {group.pontos.map((item, i) => (
          <CardPonto ponto={item} key={"ponto-" + i} publicCard={false} />
        ))}
        <AddCard cod_edificacao={group.edificacao.codigo} />
        <AddCard cod_edificacao={group.edificacao.codigo} tipo="reservatorio" />
      </div>
    </div>
  );
}
