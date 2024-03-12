import { SequenciaFull } from "@/utils/api_consumer";

export default function CardSequencia(props: { sequencia: SequenciaFull }) {
  const view = () => {
    window.location;
  };

  return (
    props.sequencia && (
      <div className="relative flex aspect-square w-[260px] flex-col items-center justify-between rounded-md border border-neutral-300 bg-white px-2 py-4 text-center shadow-lg">
        <h6>{props.sequencia.id.toString()}</h6>
        <h3>{props.sequencia.codigo_edificacao}</h3>
        <h2 className="text-center text-xl">
          {props.sequencia.nome_edificacao}
        </h2>
        <p className="text-sm">
          {props.sequencia.tipo === 1 ? "Bebedouro" : "RPS"}
        </p>
        <p className="text-sm">{props.sequencia.ambiente_ponto}</p>
        <h5>Amostragem {props.sequencia.amostragem.toString()}</h5>
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
