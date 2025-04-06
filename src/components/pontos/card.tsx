import { type PontoDto } from '@/core/components/ponto/ponto.model';
import { useExcluirPonto } from '@/core/components/ponto/ponto.service';
import { cn } from '@/lib/utils';
import { TIPOS_PONTOS } from '@/utils/types';
import Link from 'next/link';
import { DestructiveAlert } from '../alert-dialog';
import { Button } from '../ui/button';

export function CardPonto(props: Readonly<{ ponto: PontoDto }>) {
  const randomNumber = Math.floor((Math.random() * 10) / 5) + 1;
  const { ponto } = props;
  const tipo = ponto.tipo < 2 ? 'pontos' : 'reservatorios';
  const excluirPonto = useExcluirPonto();
  return (
    <div className="group relative flex min-h-64 grow flex-col items-center justify-between rounded-md bg-white text-center lg:max-w-64">
      <img
        src={`/example${randomNumber}.jpg`}
        alt={`Imagem do ponto de coleta ${ponto.id}`}
        className="w-full select-none object-cover transition-all duration-300 ease-in-out group-hover:grayscale-[50%]"
      />
      <div
        className={cn(
          'absolute bottom-0 h-28 w-full overflow-hidden rounded-sm bg-slate-100 shadow lg:h-16',
          'transition-all duration-300 ease-in-out group-hover:h-28',
        )}
      >
        {/* Header */}
        <div className={cn('flex w-full flex-col items-center p-2')}>
          <span className="text-xs text-slate-500">
            {TIPOS_PONTOS[ponto.tipo]}
            {ponto.tombo && ` (${ponto.tombo})`}
          </span>
          <h2 className="text-md truncate p-2 font-semibold text-primary-800">
            {ponto.localizacao}
          </h2>
          {/* Content */}
          <div className="flex-gap flex justify-center gap-4 lg:hidden lg:group-hover:flex">
            <Button variant="ghost" asChild>
              <Link
                href={`/admin/edificacoes/${ponto.edificacao.codigo}/${tipo}/${ponto.id}/editar`}
              >
                Editar
              </Link>
            </Button>
            <DestructiveAlert onConfirm={() => excluirPonto.mutate(ponto.id!)}>
              <Button variant="table-delete">
                {/* <FaRegTrashCan />  */}
                Excluir
              </Button>
            </DestructiveAlert>
          </div>
        </div>
      </div>
    </div>
  );
}
