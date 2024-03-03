import { SequenciaFull } from "@/utils/api_consumer";

export default function CardSequencia(props: { sequencia: SequenciaFull }) {
    const view = () => {
        window.location
    }

    return props.sequencia && (
        <div className="relative w-[260px] px-2 py-4 aspect-square items-center flex flex-col justify-between bg-white rounded-md shadow-lg border border-neutral-300 text-center">
            <h6>{props.sequencia.id.toString()}</h6>
            <h3>{props.sequencia.codigo_edificacao}</h3>
            <h2 className="text-xl text-center">{props.sequencia.nome_edificacao}</h2>
            <p className="text-sm">{props.sequencia.tipo === 1 ? 'Bebedouro' : 'RPS'}</p>
            <p className="text-sm">{props.sequencia.ambiente_ponto}</p>
            <h5>Amostragem {props.sequencia.amostragem.toString()}</h5>
            <button
                onClick={view}
                className="filled-button bg-primary-500 rounded-md p-3 text-xs font-semibold text-white"
            >
                <i className="bi bi-eye-fill"></i>
                Detalhes
            </button>
        </div>
    );
}
