"use client";

import Filters from "@/components/sequencias/Filters";
import CardPonto, { AddCard } from "@/components/pontos/CardPontos";
import { Edificacao, Ponto } from "@/utils/types";
import { useEdificacoes, toURLParams, usePonto } from "@/utils/api_consumer/client_side_consumer";

import { useEffect, useState } from "react";
import AbortController from 'abort-controller';

function groupBy<Type>(arr: Type[], key: (el: Type) => any) {
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

function CardEdificacao(props: { group: { edificacao: Edificacao, pontos: Ponto[] } }) {
  const { group } = props;
  return (
    <div className="mb-8 rounded bg-gradient-to-b from-gray-100 to-gray-50 border border-gray-300">
      <div className="flex justify-between p-4 py-2">
        <h3 className="text-xl font-semibold text-black">{group.edificacao.codigo} - {group.edificacao.nome}</h3>
        <a href={`/admin/edificacoes/${group.edificacao.codigo}`} className="hover:text-primary-600">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg></a>
      </div>
      <div className="p-4 flex gap-4 flex-wrap">
        {group.pontos.map((item, i) => (
          <CardPonto ponto={item} key={"ponto-" + i} />
        ))}
        <AddCard cod_edificacao={group.edificacao.codigo} />
      </div>
    </div>
  )
}

export default function Pontos() {
  const [filters, setFilters] = useState<any>({ q: "", campus: "" })
  const edificacoes: Edificacao[] = useEdificacoes();
  const filteredEdificacoes = edificacoes.filter((edificacao) => {
    const matchesQuery = edificacao.codigo.includes(filters.q) || edificacao.nome.includes(filters.q);
    const matchesCampus = filters.campus === "BOTH" || edificacao.campus === filters.campus;
    return matchesQuery && matchesCampus;
  });
  const [checkBebedouro, setCheckBebedouro] = useState<boolean>(true);
  const [checkRPS, setCheckRPS] = useState<boolean>(true);
  const [checkRPI, setCheckRPI] = useState<boolean>(true);
  const [checkRDS, setCheckRDS] = useState<boolean>(true);
  const [checkRDI, setCheckRDI] = useState<boolean>(true);
  const [checkCAERN, setCheckCAERN] = useState<boolean>(true);


  const [pontos, setPontos] = useState<Ponto[]>([]);

  const [abortController, setAbortController] = useState(new AbortController());

  const groups = groupBy<Ponto>(pontos, (ponto: Ponto) => {
    return ponto.edificacao.codigo;
  });

  for (let edificacao of filteredEdificacoes) {
    if (!groups[edificacao.codigo]) {
      {
        groups[edificacao.codigo] = { edificacao: edificacao, pontos: [] };
      }
    }
  }


  useEffect(() => {
    if (abortController) {
      abortController.abort();
    }

    const newAbortController = new AbortController();
    setAbortController(newAbortController);

    const fetchData = async () => {
      const _filters = { ...filters };
      if (_filters.campus === "BOTH") {
        delete _filters.campus;
      }

      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/pontos?limit=10000`
      let query = toURLParams(_filters);

      // http://localhost:8000/api/v1/pontos/?tipo=1&tipo=3&limit=10000&offset=0
      if (checkBebedouro) query = query.concat("&tipo=1");
      if (checkRPS) query = query.concat("&tipo=2");
      if (checkRPI) query = query.concat("&tipo=3");
      if (checkRDS) query = query.concat("&tipo=4");
      if (checkRDI) query = query.concat("&tipo=5");
      if (checkCAERN) query = query.concat("&tipo=6");

      console.log(`${url}&${query}`);

      const res = await fetch(`${url}&${query}`, { signal: newAbortController.signal, cache: "no-cache" });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const pontos = await res.json();
      setPontos(pontos.items);
    };

    fetchData();

    return () => {
      newAbortController.abort();
    };
  }, [filters, checkBebedouro, checkRPS, checkRPI, checkRDS, checkRDI, checkCAERN]);

  return (
    <>
      <h2 className="text-3xl text-[#525252]">Pontos de Coleta</h2>
      <div className="flex w-full flex-col items-center">
        <div className="mb-4 flex w-full flex-col gap-4">
          <div className="relative flex">
            <i className="bi bi-search"></i>
            <input
              id="search-bar"
              className="w-full rounded-md border border-[#ABABAB] bg-white px-5 py-3 text-[#525252]"
              type="text"
              name="search-query"
              placeholder="Digite o termo de pesquisa"
              onChange={(e) => {
                setFilters({ ...filters, q: e.target.value });
              }
              }
            />
          </div>
          <div className="w-full flex justify-between gap-3 self-end">

            <div className="flex gap-8">
              <div className="flex flex-row justify-center items-center">

                <label htmlFor="bebedouro" onClick={(e) => { setCheckBebedouro(!checkBebedouro); setFilters }}
                  className={`cursor-pointer ${checkBebedouro ? "text-primary-500  hover:text-primary-800" : "hover:text-primary-400"} `}
                > Bebedouro</label>
                <input id="bebedouro" name="tipo" type="checkbox" value="1" defaultChecked={checkBebedouro} hidden
                  className="" />
              </div>
              <div className="flex flex-row justify-center items-center">
                <label htmlFor="rps" onClick={(e) => { setCheckRPS(!checkRPS) }}
                  className={`cursor-pointer ${checkRPS ? "text-primary-500  hover:text-primary-800" : "hover:text-primary-400"} `}
                > RPS</label>
                <input id="rps" name="tipo" type="checkbox" value="2" defaultChecked={checkRPS} hidden
                  className="" />
              </div>
              <div className="flex flex-row justify-center items-center">
                <label htmlFor="rpi" onClick={(e) => { setCheckRPI(!checkRPI) }}
                  className={`cursor-pointer ${checkRPI ? "text-primary-500  hover:text-primary-800" : "hover:text-primary-400"} `}
                > RPI</label>
                <input id="rpi" name="tipo" type="checkbox" value="3" defaultChecked={checkRPI} hidden
                  className="" />
              </div>
              <div className="flex flex-row justify-center items-center">
                <label htmlFor="rds" onClick={(e) => { setCheckRDS(!checkRDS) }}
                  className={`cursor-pointer ${checkRDS ? "text-primary-500" : "hover:text-primary-400"} `}
                > RDS</label>
                <input id="rds" name="tipo" type="checkbox" value="4" defaultChecked={checkRDS} hidden
                  className="" />
              </div>
              <div className="flex flex-row justify-center items-center">
                <label htmlFor="rdi" onClick={(e) => { setCheckRDI(!checkRDI) }}
                  className={`cursor-pointer ${checkRDI ? "text-primary-500  hover:text-primary-800" : "hover:text-primary-400"} `}
                > RDI</label>
                <input id="rdi" name="tipo" type="checkbox" value="5" defaultChecked={checkRDI} hidden
                  className="" />
              </div>
              <div className="flex flex-row justify-center items-center">
                <label htmlFor="caern" onClick={(e) => { setCheckCAERN(!checkCAERN) }}
                  className={`cursor-pointer ${checkCAERN ? "text-primary-500" : "hover:text-primary-400"} `}
                > CAERN</label>
                <input id="caern" name="tipo" type="checkbox" value="6" defaultChecked={checkCAERN} hidden
                  className="" />
              </div>
            </div>

            <select
              name="campus"
              className="w-36 rounded-md border border-[#ABABAB] bg-white px-3 py-2 text-[#525252]"
              onChange={(e) => { setFilters({ ...filters, campus: e.target.value }) }}
            >
              <option value="" disabled selected hidden>
                Campus
              </option>
              <option value="BOTH">Leste/Oeste</option>
              <option value="LE">Leste</option>
              <option value="OE">Oeste</option>
            </select>
          </div>
        </div>
        <a href="/admin/edificacoes/criar" className="p-2 px-4 mb-4 w-full bg-gray-100 border border-gray-300 text-green-500 font-semibold rounded-md hover:bg-green-600 hover:text-white text-center">+ Adicionar edificação</a>
        <div className="flex flex-col w-full">
          {Object.values(groups).map((group, i) => {
            return (
              <CardEdificacao group={group} key={"edificacao-" + i} />
            )
          }
          )}
        </div>
      </div>
    </>
  );
}
