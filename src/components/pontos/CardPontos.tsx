import { Ponto, TIPOS_PONTOS} from "@/utils/types";


export default function CardPonto(props: { ponto: Ponto }) {
  const { ponto } = props;
  const edificacao = ponto.edificacao;

  return (
    ponto && (
      <div className="relative flex aspect-square w-[260px] flex-col items-center justify-between rounded-md border border-neutral-300 bg-white px-2 py-4 text-center">
        <h3>{edificacao?.codigo}</h3>
        {/* <h2 className="text-center text-xl">{edificacao?.nome}</h2> */}
        <h2 className="text-center text-xl">{TIPOS_PONTOS[ponto.tipo - 1]}</h2>
        {/* <p className="text-sm">{ponto.tipo === 1 ? "Bebedouro" : "RPS"}</p> */}
        <p className="text-sm">{ponto.ambiente}</p>

        <a
          href={`pontos/${ponto.id}`}
          className="filled-button rounded-md bg-primary-500 p-3 text-xs font-semibold text-white"
        >
          <i className="bi bi-eye-fill"></i>
          Detalhes
        </a>
      </div>
    )
  );
}
