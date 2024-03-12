"use client";

import Filters from "@/components/sequencias/Filters";
import CardPonto from "@/components/pontos/CardPontos";
import { usePontos } from "@/utils/api_consumer";

export default function Pontos() {
  const pontos = usePontos("http://localhost:8000/api/v1/pontos");

  return (
    <>
      <h2 className="text-3xl text-[#525252]">Pontos de Coleta</h2>
      <div className="flex w-full flex-col items-center">
        <Filters />
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
