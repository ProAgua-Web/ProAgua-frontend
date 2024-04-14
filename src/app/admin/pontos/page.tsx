import Filters from "@/components/sequencias/Filters";
import CardPonto from "@/components/pontos/CardPontos";
import { API_BASE_URL } from "@/utils/config";
import { Ponto } from "@/utils/api_consumer";

export default async function Pontos() {
  const resp = await fetch(API_BASE_URL + '/api/v1/pontos');
  const pontos: Ponto[] = (await resp.json()).items;

  return (
    <>
      <h2 className="text-3xl text-[#525252]">Pontos de Coleta</h2>
      <div className="flex w-full flex-col items-center">
        <Filters />
        <a href="/admin/pontos/criar" className="p-4 bg-primary-500 text-white font-semibold rounded-md hover:bg-primary-600">+ Adicionar ponto</a>
        <div
          id="result-list"
          className="grid w-full grid-cols-[repeat(auto-fill,minmax(260px,1fr))] justify-center gap-8"
        >
          {pontos.map((item, i) => (
            <CardPonto ponto={item} key={"ponto-" + i} />
          ))}
        </div>
      </div>
    </>
  );
}
