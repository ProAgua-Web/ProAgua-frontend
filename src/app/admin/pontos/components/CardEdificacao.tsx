"use client";
import CardPonto, { AddCard } from "@/components/pontos/CardPontos";
import { Edificacao, Ponto } from "@/utils/types";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export function CardEdificacao(props: { group: { edificacao: Edificacao; pontos: Ponto[]; }; collapsed: boolean; }) {
  const { group } = props;
  const [collapsed, setCollapsed] = useState<boolean>(props.collapsed);

  return (
    <div className={`mb-4 border rounded-lg border-gray-300 bg-gray-50 hover:shadow-lg transition-shadow duration-75 ${collapsed && "rounded bg-gray-200 border-t"}`}>
      <div className="border-b border-gray-300 flex justify-between p-4 py-2">
        <button
          className="w-full text-xl text-start font-regular py-4 px-2 text-black"
          onClick={() => setCollapsed(!collapsed)}
        >
          {group.edificacao.codigo} - {group.edificacao.nome}
        </button>
        <a href={`/admin/edificacoes/${group.edificacao.codigo}`} className="text-neutral-500 p-4 hover:text-primary-600">
          <FontAwesomeIcon icon={faPenToSquare} size="lg" className="font-light"/>
        </a>
      </div>
      <div className={`p-4 flex gap-4 flex-wrap bg-gray-100 ${collapsed ? 'hidden' : ''}`}>
        {group.pontos.map((item, i) => (
          <CardPonto ponto={item} key={"ponto-" + i} publicCard={false} />
        ))}
        <AddCard cod_edificacao={group.edificacao.codigo} />
        <AddCard cod_edificacao={group.edificacao.codigo} tipo="reservatorio" />
      </div>
    </div>
  );
}
