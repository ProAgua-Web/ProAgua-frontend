'use client';
import { Button } from '@/components/ui/button';
import { DropdownMenu } from '@/components/ui/dropdown-menu';
import { type EdificacaoDto } from '@/core/components/edificacao/edificacao.model';
import { type PontoDto } from '@/core/components/ponto/ponto.model';
import { cn } from '@/lib/utils';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import Link from 'next/link';
import { useState } from 'react';
import { FaEllipsis } from 'react-icons/fa6';
import { CardPonto } from '../../coleta/ui/card-ponto';
import { useExcluirEdificacao } from '../edificacao.service';

interface CardEdificacaoProps {
  edificacao: EdificacaoDto;
  pontos: PontoDto[];
}

export const CardEdificacao = ({ edificacao, pontos }: CardEdificacaoProps) => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const excluirEdificacao = useExcluirEdificacao();

  return (
    <div className="mb-4 rounded-lg border border-t border-gray-200 bg-gray-50 shadow-lg">
      <div
        className={cn(
          'flex min-h-14 justify-between',
          !collapsed && 'border-b border-gray-300',
        )}
      >
        <Button
          variant="edificacao-header"
          size="full"
          onClick={() => setCollapsed(!collapsed)}
        >
          {edificacao.codigo} - {edificacao.nome}
        </Button>

        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="xl">
                <FaEllipsis size={18} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-50 w-screen text-center lg:w-fit lg:text-left">
              <DropdownMenuItem>
                <Button variant="dropdown-item" asChild>
                  <Link
                    href={`/admin/edificacoes/${edificacao.codigo}/pontos/criar`}
                  >
                    Criar ponto de coleta
                  </Link>
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button variant="dropdown-item" asChild>
                  <Link
                    href={`/admin/edificacoes/${edificacao.codigo}/reservatorios/criar`}
                  >
                    Criar reservatório
                  </Link>
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button asChild variant="dropdown-item">
                  <Link href={`/admin/edificacoes/${edificacao.codigo}/editar`}>
                    Editar edificação
                  </Link>
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button
                  variant="dropdown-item"
                  className="text-red-600"
                  onClick={() => {
                    excluirEdificacao.mutate(edificacao.codigo);
                  }}
                >
                  Excluir edificação
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div
        className={cn(
          `flex flex-wrap gap-4 bg-gray-100 p-4`,
          collapsed && 'hidden',
        )}
      >
        {pontos.map((ponto, i) => (
          <CardPonto ponto={ponto} key={'ponto-' + i} />
        ))}
      </div>
    </div>
  );
};

interface DeckEdificacoesProps {
  edificacoes: EdificacaoDto[];
  pontos: PontoDto[];
}

export function DeckEdificacoes({ edificacoes, pontos }: DeckEdificacoesProps) {
  const edificacoesSet = edificacoes;
  pontos.forEach((p) => {
    if (
      p.edificacao.codigo &&
      !edificacoesSet.some((e) => e.codigo === p.edificacao.codigo)
    ) {
      edificacoes.push(p.edificacao);
    }
  });
  return (
    <>
      {edificacoesSet.map((edificacao, i) => {
        const pontosEdificacao = pontos.filter(
          (ponto) => ponto.edificacao.codigo === edificacao.codigo,
        );
        return (
          <CardEdificacao
            key={'edificacao-' + i}
            edificacao={edificacao}
            pontos={pontosEdificacao}
          />
        );
      })}
    </>
  );
}
