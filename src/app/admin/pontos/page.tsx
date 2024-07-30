"use client";

import Filters from "@/components/sequencias/Filters";
import CardPonto, { AddCard } from "@/components/pontos/CardPontos";
import { Edificacao, Ponto } from "@/utils/types";
import { useEdificacoes, toURLParams, usePonto, consumerEdficacao } from "@/utils/api_consumer/client_side_consumer";

import { useEffect, useState } from "react";
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

function Filter({ value, setValue, children, checkbox_value}: {
  value:boolean,
  setValue:(v: boolean) => void,
  children: any
  checkbox_value: string,
}) {
  return (
    <div className="flex flex-row justify-center items-center">
      <label 
        htmlFor="bebedouro"
        onClick={(e) => { setValue(!value) }}
        className={ `cursor-pointer ${value ? "text-primary-500  hover:text-primary-800" : "hover:text-primary-400"} `}
      >
        {children}
      </label>
      <input
        id="bebedouro"
        name="tipo"
        type="checkbox"
        value={checkbox_value}
        defaultChecked={value}
        hidden
      />
    </div>
  );
}

function CollapseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Outline"
      viewBox="0 0 24 24"
      width="20"
      height="20"
    >
      <path d="M1,6H23a1,1,0,0,0,0-2H1A1,1,0,0,0,1,6Z" />
      <path d="M23,9H1a1,1,0,0,0,0,2H23a1,1,0,0,0,0-2Z" />
      <path d="M23,19H1a1,1,0,0,0,0,2H23a1,1,0,0,0,0-2Z" />
      <path d="M23,14H1a1,1,0,0,0,0,2H23a1,1,0,0,0,0-2Z" />
    </svg>
  )
}

function ExpandIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="20" height="20">
      <path d="M19,1H5C2.24,1,0,3.24,0,6v12c0,2.76,2.24,5,5,5h14c2.76,0,5-2.24,5-5V6c0-2.76-2.24-5-5-5ZM5,3h14c1.65,0,3,1.35,3,3v2H2v-2c0-1.65,1.35-3,3-3Zm14,18H5c-1.65,0-3-1.35-3-3V10H22v8c0,1.65-1.35,3-3,3Z" />
    </svg>
  )
}

export default function Pontos() {
  const [filters, setFilters] = useState<any>({ q: "", campus: "" })
  const [edificacoes, setEdificacoes] = useState<Edificacao[]>([]);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  
  const filteredEdificacoes = edificacoes;
  const [checkBebedouro, setCheckBebedouro] = useState<boolean>(true);
  const [checkTorneira, setCheckTorneira] = useState<boolean>(true);
  const [checkRPS, setCheckRPS] = useState<boolean>(true);
  const [checkRPI, setCheckRPI] = useState<boolean>(true);
  const [checkRDS, setCheckRDS] = useState<boolean>(true);
  const [checkRDI, setCheckRDI] = useState<boolean>(true);
  const [checkCAERN, setCheckCAERN] = useState<boolean>(true);
  const [pontos, setPontos] = useState<Ponto[]>([]);
  const [abortController, setAbortController] = useState(new AbortController());
  const groups: Groups = groupBy(pontos, (ponto: Ponto) => {
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
    const query = toURLParams(filters);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/edificacoes?${query}`, { cache: "no-cache", credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        setEdificacoes(data.items); // Ensure data.items is an array or fallback to an empty array
      })
  },[filters]);
  
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

      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/pontos`
      let query = toURLParams(_filters);

      // http://localhost:8000/api/v1/pontos/?tipo=1&tipo=3&limit=10000&offset=0
      if (checkBebedouro) query = query.concat("&tipo=0");
      if (checkTorneira) query = query.concat("&tipo=1");
      if (checkRPS) query = query.concat("&tipo=2");
      if (checkRPI) query = query.concat("&tipo=3");
      if (checkRDS) query = query.concat("&tipo=4");
      if (checkRDI) query = query.concat("&tipo=5");
      if (checkCAERN) query = query.concat("&tipo=6");

      // TODO: fazer uso do consumer
      const res = await fetch(`${url}?${query}`, { cache: "no-cache", credentials: 'include' });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const pontos = await res.json();
      setPontos(pontos.items);
    };

    fetchData();
  }, [filters, checkBebedouro, checkRPS, checkRPI, checkRDS, checkRDI, checkCAERN]);

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
              <Filter checkbox_value="0" value={checkBebedouro} setValue={setCheckBebedouro}>Bebedouro</Filter>
              <Filter checkbox_value="1" value={checkTorneira} setValue={setCheckTorneira}>Torneira</Filter>
              <Filter checkbox_value="2" value={checkRPS} setValue={setCheckRPS}>RPS</Filter>
              <Filter checkbox_value="3" value={checkRPI} setValue={setCheckRPI}>RPI</Filter>
              <Filter checkbox_value="4" value={checkRDS} setValue={setCheckRDS}>RDS</Filter>
              <Filter checkbox_value="5" value={checkRDI} setValue={setCheckRDI}>RDI</Filter>
              <Filter checkbox_value="6" value={checkCAERN} setValue={setCheckCAERN}>CAERN</Filter>
            </div>

            <button
              onClick={() => setCollapsed(!collapsed)}
              className={`self-end px-4 py-2 mb-2 border rounded-md hover:bg-slate-50`}>
              { collapsed ? <CollapseIcon /> : <ExpandIcon /> }
            </button>

          </div>
        </div>
        <div className="flex flex-col w-full">
          <a href="/admin/edificacoes/criar" className="p-2 px-4 mb-4 w-full bg-gray-100 border border-gray-300 text-green-500 font-semibold rounded-md hover:bg-green-600 hover:text-white text-center">+ Adicionar edificação</a>

          {Object.values(groups).map((group, i) => {
            return (
              <CardEdificacao group={group} key={"edificacao-" + i} collapsed={collapsed} />
            )
          }
          )}
        </div>
      </div>
    </>
  );
}
