import { type PontoDto } from '@/core/components/ponto/ponto.model';
import { TIPOS_PONTOS } from '@/utils/types';

export default function CardPonto(props: {
  ponto: PontoDto;
  publicCard: boolean;
}) {
  const randomNumber = Math.floor((Math.random() * 10) / 5) + 1;
  const { ponto, publicCard = false } = props;
  const tipo = ponto.tipo <= 1 ? 'pontos' : 'reservatorios';
  return (
    ponto && (
      <div className="group relative flex grow flex-col items-center justify-between rounded-md bg-white text-center lg:max-w-64">
        <img
          src={`/example${randomNumber}.jpg`}
          className="w-full object-cover transition-all duration-300 ease-in-out group-hover:grayscale-[50%]"
        />
        {/* Header */}
        <div className="absolute bottom-0 h-16 w-full overflow-hidden rounded-sm bg-slate-100 shadow transition-all duration-300 ease-in-out group-hover:h-[83%]">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 group-hover:block">
            <span className="text-xs text-slate-500">
              {TIPOS_PONTOS[ponto.tipo]}
            </span>
            <h2 className="text-md h-full truncate p-2 font-semibold text-primary-800">
              {ponto.localizacao}
            </h2>
          </div>
          {/* Content */}
          <div></div>
        </div>
      </div>
    )
  );
}

export function AddCard({
  cod_edificacao,
  tipo,
}: {
  cod_edificacao?: string;
  tipo?: string;
}) {
  const url_tipo =
    tipo === 'reservatorio'
      ? '/admin/reservatorios/criar'
      : '/admin/pontos/criar';
  return (
    <a href={`${url_tipo}${cod_edificacao ? `/${cod_edificacao}` : ''}`}>
      <div className="border-bule-300 relative flex aspect-square cursor-pointer flex-col items-center justify-center rounded-md border bg-blue-200 px-2 py-4 text-center text-blue-700 transition-colors duration-100 hover:bg-slate-100 hover:text-blue-500 lg:w-64">
        <h2> {tipo === 'reservatorio' ? 'Reservatório' : 'Ponto Inicial'}</h2>
        <h2 className="select-none text-center text-3xl"> +</h2>
      </div>
    </a>
  );
}
