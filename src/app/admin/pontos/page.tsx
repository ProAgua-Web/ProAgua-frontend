import Filters from "@/components/sequencias/Filters";
import CardPonto from "@/components/pontos/CardPontos";
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

function CardEdificacao(props: {group: [string, Ponto[]]}) {
  const { group } = props;

  return (
    <div className="mb-8 rounded bg-gradient-to-b from-gray-100 to-gray-50 border border-gray-300">
      <div className="flex justify-between p-4 py-2">
        <h3 className="text-xl font-semibold text-black">{group[0]}</h3>
        {/* <a href="/admin/pontos/criar" className="p-4 mb-4 w-48 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600">+ Adicionar ponto</a> */}
      </div>
      <div className="p-4 flex gap-4 flex-wrap">
        {group[1].map((item, i) => (
          <CardPonto ponto={item} key={"ponto-" + i} />
        ))}
      </div>
    </div>
  )
}

export default async function Pontos() {
  const resp = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/v1/pontos');
  const pontos: Ponto[] = (await resp.json()).items;
  const groups = groupBy<Ponto>(pontos, (ponto: Ponto) => {
    return `${ponto.edificacao.codigo} - ${ponto.edificacao.nome}`
  });

  return (
    <>
      <h2 className="text-3xl text-[#525252]">Pontos de Coleta</h2>
      <div className="flex w-full flex-col items-center">
        <Filters />
        <a href="/admin/pontos/criar" className="p-2 px-4 mb-4 w-full bg-gray-100 border border-gray-300 text-green-500 font-semibold rounded-md hover:bg-green-600 hover:text-white text-center">+ Adicionar ponto</a>
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
