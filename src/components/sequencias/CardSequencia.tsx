import { Sequencia } from '@/utils/types';

export default function CardSequencia(props: { sequencia: Sequencia }) {
  const { sequencia } = props;

  return (
    sequencia && (
      <div className="relative flex aspect-square w-[260px] flex-col items-center justify-between rounded-md border border-neutral-300 bg-white px-2 py-4 text-center shadow-lg">
        {/* <h6>{sequencia.id.toString()}</h6> */}
        <h3>{sequencia.ponto?.edificacao.codigo}</h3>
        <h2 className="text-center text-xl">
          {sequencia.ponto?.edificacao.nome}
        </h2>
        <p className="text-sm">
          {sequencia.ponto?.tipo === 1 ? 'Bebedouro' : 'RPS'}
        </p>
        <p className="text-sm">{sequencia.ponto?.localizacao}</p>
        <h5>Ciclo de Amostragem {sequencia.amostragem.toString()}</h5>
        <a
          href={`sequencias_coletas/${sequencia.id}`}
          className="filled-button rounded-md bg-primary-500 p-3 text-xs font-semibold text-white"
        >
          <i className="bi bi-eye-fill"></i>
          Detalhes
        </a>
      </div>
    )
  );
}
