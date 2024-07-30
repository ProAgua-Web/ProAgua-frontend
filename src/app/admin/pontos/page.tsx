"use client";

import { Edificacao, Ponto } from "@/utils/types";
import { consumerEdficacao, consumerPonto } from "@/utils/api_consumer/client_side_consumer";

import { useEffect, useState } from "react";
import { CollapseIcon } from "./components/CollapseIcon";
import { ExpandIcon } from "./components/ExpandIcon";
import { CardEdificacao } from "./components/CardEdificacao";

function groupBy(arr: Ponto[], key: (el: Ponto) => any) {
  var groups = Object();

  arr.forEach(element => {
    let groupName = key(element);
    let group = groups[groupName] || {
      edificacao: element.edificacao,
      pontos: []
    };

    group.pontos.push(element);
    groups[groupName] = group;
  })

  return groups;
}

interface Groups {
  [x: string]: {edificacao: Edificacao, pontos: Ponto[]}
}

export default function Pontos() {
  const [pontos, setPontos] = useState<Ponto[]>([]);
  const [edificacoes, setEdificacoes] = useState<Edificacao[]>([]);
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const [filters, setFilters] = useState<any>({ 
    q: "",
    campus: "",
    filtroPontos: {
      "Bebedouro": true,
      "Torneira": true, 
      "RPS": true,
      "RPI": true,
      "RDS": true,
      "RDI": true,
      "CAERN": true
    }
  })

  // Agrupa pontos de acordo com a edificação
  const groups: Groups = groupBy(pontos, (ponto: Ponto) => ponto.edificacao.codigo );
  
  // Adiciona novos grupos vazios para edificações que não possuem pontos
  for (let edificacao of edificacoes) {
    if (!groups[edificacao.codigo]) {
      groups[edificacao.codigo] = { edificacao: edificacao, pontos: [] };
    }
  }

  useEffect(() => {
    // Acessar todas as edificações pela API
    consumerEdficacao.list()
      .then( data => setEdificacoes(data) );
    
    // Cria lista com ids referentes aos tipos de pontos filtrados
    const filtrosIds = Object.entries(filters.filtroPontos)
      .filter(([key, value]) => value == true)
      .map((entry, index) => Number(index + 1));

    // Acessar todos os pontos da API de acordo com os filtros
    consumerPonto.list("no-cache", { tipo: filtrosIds })
      .then( data => setPontos(data) );
    
  },[filters]);


  function toggleFilter(name: string) {
    setFilters(
      {
        ...filters,
        filtroPontos: {
          ...filters.filtroPontos,
          [name]: !filters.filtroPontos[name]
        }
      }
    );
  }

  return (
    <>
      <h2 className="text-3xl text-[#525252]">Edificações e Pontos de Coleta</h2>

      <div className="flex w-full flex-col items-center">
        <div className="mb-4 flex w-full flex-col gap-4">
          <div className="relative flex space-between gap-2">
            <input
              id="search-bar"
              className="w-full rounded-md border bg-white px-5 py-3 text-[#525252]"
              type="text"
              name="search-query"
              placeholder="Digite o termo de pesquisa"
              onChange={ e => setFilters({ ...filters, q: e.target.value }) }
            />

            <select
              name="campus"
              className="w-36 rounded-md border bg-white px-3 py-2 text-[#525252]"
              onChange={ e => setFilters({ ...filters, campus: e.target.value }) }
            >
              <option value="" disabled selected hidden>Campus</option>
              <option value="">Leste/Oeste</option>
              <option value="LE">Leste</option>
              <option value="OE">Oeste</option>
            </select>
          </div>
          <div className="w-full flex justify-between gap-3 self-end">

            <div className="flex gap-8">

              { Object.entries(filters.filtroPontos).map(([key, value]) => {
                return (
                  <label htmlFor={key}>
                    <input 
                      type="checkbox"
                      name={key}
                      key={key}
                      id={key}
                      checked={Boolean(value)}
                      onChange={() => toggleFilter(key) }
                    />
                    {key}
                  </label>
                );
              })}
            </div>

            <button
              className="self-end px-4 py-2 mb-2 border rounded-md hover:bg-slate-50"
              onClick={ () => setCollapsed(!collapsed) }
            >
              { collapsed ? <CollapseIcon /> : <ExpandIcon /> }
            </button>

          </div>
        </div>

        <div className="flex flex-col w-full">
          <a href="/admin/edificacoes/criar" className="p-2 px-4 mb-4 w-full bg-gray-100 border border-gray-300 text-green-500 font-semibold rounded-md hover:bg-green-600 hover:text-white text-center">+ Adicionar edificação</a>
          {Object.values(groups).map((group, i) => {
            return <CardEdificacao group={group} key={"edificacao-" + i} collapsed={collapsed} />
          })}
        </div>

      </div>
    </>
  );
}
