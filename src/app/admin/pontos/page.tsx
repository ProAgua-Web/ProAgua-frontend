import Filters from "@/components/sequencias/Filters";
import CardPonto, { AddCard } from "@/components/pontos/CardPontos";
import { Ponto } from "@/utils/types";

function groupBy<Type>(arr: Type[], key: (el: Type) => string) {
  var groups = Object();

  arr.forEach(element => {
    let groupName = key(element);
    let group: Object[] = groups[groupName] || [];
    group.push(element);
    groups[groupName] = group;
  })

  return groups;
}

function CardEdificacao(props: { group: [string, Ponto[]] }) {
  const { group } = props;

  return (
        <div className="mb-8 rounded bg-gradient-to-b from-gray-100 to-gray-50 border border-gray-300">
          <div className="flex justify-between p-4 py-2">
              <h3 className="text-xl font-semibold text-black">{group[0]}</h3>
              <a href={`/admin/edificacoes/${group[1][0].edificacao.codigo}`} className="hover:text-primary-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
    </svg></a>
          </div>
          <div className="p-4 flex gap-4 flex-wrap">
            {group[1].map((item, i) => (
              <CardPonto ponto={item} key={"ponto-" + i} />
            ))}
            <AddCard cod_edificacao={group[1][0].edificacao.codigo}/>
          </div>
        </div>
  )
}

export default async function Pontos() {
  const resp = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/v1/pontos?limit=10000', { cache: "no-cache" });
  const pontos: Ponto[] = (await resp.json()).items;
  const groups = groupBy<Ponto>(pontos, (ponto: Ponto) => {
    return `${ponto.edificacao.codigo} - ${ponto.edificacao.nome}`
  });

  return (
    <>
      <h2 className="text-3xl text-[#525252]">Pontos de Coleta</h2>
      <div className="flex w-full flex-col items-center">
        <Filters />
        <a href="/admin/edificacoes/criar" className="p-2 px-4 mb-4 w-full bg-gray-100 border border-gray-300 text-green-500 font-semibold rounded-md hover:bg-green-600 hover:text-white text-center">+ Adicionar edificação</a>
        <div className="flex flex-col w-full">
          {Object.entries(groups).map((group) => {
            return (
              <CardEdificacao group={group} />
            )
          })}
        </div>
      </div>
    </>
  );
}
