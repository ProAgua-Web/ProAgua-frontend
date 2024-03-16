import { useEffect, useState } from "react";
import { Ponto, fetchEdificacao, Edificacao } from "@/utils/api_consumer";

function useEdificacao(url: string) {
  const [edificacao, setEdificacao] = useState<Edificacao | null>(null);

  useEffect(() => {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => setEdificacao(data));
  }, []);

  return edificacao;
}

export default function CardPonto(props: { ponto: Ponto }) {
  const { ponto } = props;
  const edificacao = useEdificacao(
    "http://localhost:8000" + ponto.edificacao_url,
  );

  const view = () => {
    window.location;
  };

  return (
    ponto && (
      <div className="relative flex aspect-square w-[260px] flex-col items-center justify-between rounded-md border border-neutral-300 bg-white px-2 py-4 text-center shadow-lg">
        <h3>{edificacao?.codigo}</h3>
        <h2 className="text-center text-xl">{edificacao?.nome}</h2>
        <p className="text-sm">{ponto.tipo === 1 ? "Bebedouro" : "RPS"}</p>
        <p className="text-sm">{ponto.ambiente}</p>

        <button
          onClick={view}
          className="filled-button rounded-md bg-primary-500 p-3 text-xs font-semibold text-white"
        >
          <i className="bi bi-eye-fill"></i>
          Detalhes
        </button>
      </div>
    )
  );
}
