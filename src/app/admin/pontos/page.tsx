"use client";

import Filters from "@/components/sequencias/Filters";
import CardPonto, { AddCard } from "@/components/pontos/CardPontos";
import { Edificacao, Ponto } from "@/utils/types";
import { useEdificacoes, toURLParams, usePonto, consumerEdficacao } from "@/utils/api_consumer/client_side_consumer";

import { useEffect, useState } from "react";
import AbortController from 'abort-controller';


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

function CardEdificacao(props: { group: { edificacao: Edificacao, pontos: Ponto[]}, collapsed: boolean }) {

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
  )
}

type GroupPonto = {
  edificacao: Edificacao,
  pontos: Ponto[]
};


interface Groups {
  [x: string]: {edificacao: Edificacao, pontos: Ponto[]}
}

export default function Pontos() {
  const [filters, setFilters] = useState<any>({ q: "", campus: "" })
  const [edificacoes, setEdificacoes] = useState<Edificacao[]>([]);

  const [collapsed, setCollapsed] = useState<boolean>(false);

  useEffect(() => {
    // TODO: fazer uso do consumer
    // consumerEdficacao.list()
    //   .then(data => {
    //     setEdificacoes(data)
    //   })

    const query = toURLParams(filters);
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/edificacoes?${query}`, { cache: "no-cache", credentials: 'include' })
        .then(res => res.json())
        .then(data => {
          setEdificacoes(data.items); // Ensure data.items is an array or fallback to an empty array
        })
    }, [filters]);

  // const filteredEdificacoes = edificacoes.filter((edificacao) => {
  //   const matchesQuery = edificacao.codigo.includes(filters.q) || edificacao.nome.includes(filters.q);
  //   const matchesCampus = filters.campus === "BOTH" || edificacao.campus === filters.campus;
  //   return matchesQuery && matchesCampus;
  // });
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
            {/* <i className="bi bi-search"></i> */}
            <input
              id="search-bar"
              className="w-full rounded-md border bg-white px-5 py-3 text-[#525252]"
              type="text"
              name="search-query"
              placeholder="Digite o termo de pesquisa"
              onChange={(e) => {
                setFilters({ ...filters, q: e.target.value });
              }
              }
            />

            <select
              name="campus"
              className="w-36 rounded-md border bg-white px-3 py-2 text-[#525252]"
              onChange={(e) => { setFilters({ ...filters, campus: e.target.value }) }}
            >
              <option value="" disabled selected hidden>
                Campus
              </option>
              <option value="">Leste/Oeste</option>
              <option value="LE">Leste</option>
              <option value="OE">Oeste</option>
            </select>
          </div>
          <div className="w-full flex justify-between gap-3 self-end">

            <div className="flex gap-8">

              <div className="flex flex-row justify-center items-center">
                <label htmlFor="bebedouro" onClick={(e) => { setCheckBebedouro(!checkBebedouro); setFilters }}
                  className={`cursor-pointer ${checkBebedouro ? "text-primary-500  hover:text-primary-800" : "hover:text-primary-400"} `}
                > Bebedouro</label>
                <input id="bebedouro" name="tipo" type="checkbox" value="0" defaultChecked={checkBebedouro} hidden
                  className="" />
              </div>

              <div className="flex flex-row justify-center items-center">
                <label htmlFor="torneira" onClick={(e) => { setCheckTorneira(!checkTorneira) }}
                  className={`cursor-pointer ${checkTorneira ? "text-primary-500  hover:text-primary-800" : "hover:text-primary-400"} `}
                > Torneira</label>
                <input id="torneira" name="tipo" type="checkbox" value="1" defaultChecked={checkTorneira} hidden
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

            <button
              onClick={() => setCollapsed(!collapsed)}
              className={`self-end px-4 py-2 mb-2 border rounded-md hover:bg-slate-50`}>

              {collapsed ?
                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="20" height="20"><path d="M1,6H23a1,1,0,0,0,0-2H1A1,1,0,0,0,1,6Z" /><path d="M23,9H1a1,1,0,0,0,0,2H23a1,1,0,0,0,0-2Z" /><path d="M23,19H1a1,1,0,0,0,0,2H23a1,1,0,0,0,0-2Z" /><path d="M23,14H1a1,1,0,0,0,0,2H23a1,1,0,0,0,0-2Z" /></svg>
                :
                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="20" height="20"><path d="M19,1H5C2.24,1,0,3.24,0,6v12c0,2.76,2.24,5,5,5h14c2.76,0,5-2.24,5-5V6c0-2.76-2.24-5-5-5ZM5,3h14c1.65,0,3,1.35,3,3v2H2v-2c0-1.65,1.35-3,3-3Zm14,18H5c-1.65,0-3-1.35-3-3V10H22v8c0,1.65-1.35,3-3,3Z" /></svg>
              }
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
