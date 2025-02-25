'use client';

import Header from '@/components/layout/Header';
import CardPonto from '@/components/pontos/CardPontos';
import { toURLParams, useEdificacoes } from '@/utils/api/client_side_consumer';
import { Edificacao, Ponto } from '@/utils/types';
import { useEffect, useState } from 'react';

function groupBy<Type>(arr: Type[], key: (el: Type) => any) {
  var groups = Object();

  arr.forEach((element: any) => {
    let groupName = key(element);
    let group = groups[groupName] || {
      edificacao: element.edificacao,
      pontos: [],
    };

    group.pontos.push(element);
    groups[groupName] = group;
  });

  return groups;
}

function CardEdificacao(props: {
  group: { edificacao: Edificacao; pontos: Ponto[] };
}) {
  const { group } = props;
  return (
    <div className="mb-8 rounded border border-gray-300 bg-gradient-to-b from-gray-100 to-gray-50">
      <div className="flex justify-between p-4 py-2">
        <h3 className="text-xl font-semibold text-black">
          {group.edificacao.codigo} - {group.edificacao.nome}
        </h3>
      </div>
      <div className="flex flex-wrap gap-4 p-4">
        {group.pontos.map((item, i) => (
          <CardPonto ponto={item} key={'ponto-' + i} publicCard={false} />
        ))}
      </div>
    </div>
  );
}

interface Groups {
  [x: string]: { edificacao: Edificacao; pontos: Ponto[] };
}

export default function Page() {
  const [filters, setFilters] = useState<any>({ q: '', campus: '' });
  const edificacoes: Edificacao[] = useEdificacoes();
  const filteredEdificacoes = edificacoes.filter((edificacao) => {
    const matchesQuery =
      edificacao.codigo.includes(filters.q) ||
      edificacao.nome.includes(filters.q);
    const matchesCampus =
      filters.campus === 'BOTH' || edificacao.campus === filters.campus;
    return matchesQuery && matchesCampus;
  });
  const [checkBebedouro, setCheckBebedouro] = useState<boolean>(true);
  const [checkRPS, setCheckRPS] = useState<boolean>(true);
  const [checkRPI, setCheckRPI] = useState<boolean>(true);
  const [checkRDS, setCheckRDS] = useState<boolean>(true);
  const [checkRDI, setCheckRDI] = useState<boolean>(true);
  const [checkCAERN, setCheckCAERN] = useState<boolean>(true);

  const [pontos, setPontos] = useState<Ponto[]>([]);

  const groups: Groups = groupBy<Ponto>(pontos, (ponto: Ponto) => {
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
    const fetchData = async () => {
      const _filters = { ...filters };
      if (_filters.campus === 'BOTH') {
        delete _filters.campus;
      }

      const url = `${process.env.NEXT_PUBLIC_API_URL}/pontos?limit=0`;
      let query = toURLParams(_filters);

      if (checkBebedouro) query = query.concat('&tipo=1');
      if (checkRPS) query = query.concat('&tipo=2');
      if (checkRPI) query = query.concat('&tipo=3');
      if (checkRDS) query = query.concat('&tipo=4');
      if (checkRDI) query = query.concat('&tipo=5');
      if (checkCAERN) query = query.concat('&tipo=6');

      const res = await fetch(`${url}&${query}`, {
        cache: 'no-cache',
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const pontos = await res.json();
      setPontos(pontos.items);
    };

    fetchData();
  }, [
    filters,
    checkBebedouro,
    checkRPS,
    checkRPI,
    checkRDS,
    checkRDI,
    checkCAERN,
  ]);

  return (
    <>
      <Header />
      <main className="relative m-auto flex w-[clamp(320px,90vw-2rem,1200px)] flex-col items-center gap-4 p-8 pt-[calc(clamp(50px,8vh,100px)+2rem)]">
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
                }}
              />
            </div>
            <div className="flex w-full justify-between gap-3 self-end">
              <div className="flex gap-8">
                <div className="flex flex-row items-center justify-center">
                  <label
                    htmlFor="bebedouro"
                    onClick={(e) => {
                      setCheckBebedouro(!checkBebedouro);
                      setFilters;
                    }}
                    className={`cursor-pointer ${checkBebedouro ? 'text-primary-500  hover:text-primary-800' : 'hover:text-primary-400'} `}
                  >
                    {' '}
                    Bebedouro
                  </label>
                  <input
                    id="bebedouro"
                    name="tipo"
                    type="checkbox"
                    value="1"
                    defaultChecked={checkBebedouro}
                    hidden
                    className=""
                  />
                </div>
                <div className="flex flex-row items-center justify-center">
                  <label
                    htmlFor="rps"
                    onClick={(e) => {
                      setCheckRPS(!checkRPS);
                    }}
                    className={`cursor-pointer ${checkRPS ? 'text-primary-500  hover:text-primary-800' : 'hover:text-primary-400'} `}
                  >
                    {' '}
                    RPS
                  </label>
                  <input
                    id="rps"
                    name="tipo"
                    type="checkbox"
                    value="2"
                    defaultChecked={checkRPS}
                    hidden
                    className=""
                  />
                </div>
                <div className="flex flex-row items-center justify-center">
                  <label
                    htmlFor="rpi"
                    onClick={(e) => {
                      setCheckRPI(!checkRPI);
                    }}
                    className={`cursor-pointer ${checkRPI ? 'text-primary-500  hover:text-primary-800' : 'hover:text-primary-400'} `}
                  >
                    {' '}
                    RPI
                  </label>
                  <input
                    id="rpi"
                    name="tipo"
                    type="checkbox"
                    value="3"
                    defaultChecked={checkRPI}
                    hidden
                    className=""
                  />
                </div>
                <div className="flex flex-row items-center justify-center">
                  <label
                    htmlFor="rds"
                    onClick={(e) => {
                      setCheckRDS(!checkRDS);
                    }}
                    className={`cursor-pointer ${checkRDS ? 'text-primary-500' : 'hover:text-primary-400'} `}
                  >
                    {' '}
                    RDS
                  </label>
                  <input
                    id="rds"
                    name="tipo"
                    type="checkbox"
                    value="4"
                    defaultChecked={checkRDS}
                    hidden
                    className=""
                  />
                </div>
                <div className="flex flex-row items-center justify-center">
                  <label
                    htmlFor="rdi"
                    onClick={(e) => {
                      setCheckRDI(!checkRDI);
                    }}
                    className={`cursor-pointer ${checkRDI ? 'text-primary-500  hover:text-primary-800' : 'hover:text-primary-400'} `}
                  >
                    {' '}
                    RDI
                  </label>
                  <input
                    id="rdi"
                    name="tipo"
                    type="checkbox"
                    value="5"
                    defaultChecked={checkRDI}
                    hidden
                    className=""
                  />
                </div>
                <div className="flex flex-row items-center justify-center">
                  <label
                    htmlFor="caern"
                    onClick={(e) => {
                      setCheckCAERN(!checkCAERN);
                    }}
                    className={`cursor-pointer ${checkCAERN ? 'text-primary-500' : 'hover:text-primary-400'} `}
                  >
                    {' '}
                    CAERN
                  </label>
                  <input
                    id="caern"
                    name="tipo"
                    type="checkbox"
                    value="6"
                    defaultChecked={checkCAERN}
                    hidden
                    className=""
                  />
                </div>
              </div>

              <select
                name="campus"
                className="w-36 rounded-md border border-[#ABABAB] bg-white px-3 py-2 text-[#525252]"
                onChange={(e) => {
                  setFilters({ ...filters, campus: e.target.value });
                }}
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
          <div className="flex w-full flex-col">
            {Object.values(groups).map((group, i) => {
              return <CardEdificacao group={group} key={'edificacao-' + i} />;
            })}
          </div>
        </div>
      </main>
    </>
  );
}
