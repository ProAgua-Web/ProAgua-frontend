'use client';
import { T } from '@/components/coletas-table';
import { Button } from '@/components/ui/button';
import { type ColetaDto } from '@/core/components/coleta/coleta.model';
import { useColetas } from '@/core/components/coleta/coleta.service';
import { type PontoDto } from '@/core/components/ponto/ponto.model';
import { usePontosBySequenciaId } from '@/core/components/ponto/ponto.service';
import {
  cloroMask,
  corMask,
  temperaturaMask,
  turbidezMask,
} from '@/lib/input-mask';
import { floatToString } from '@/lib/utils';
import Link from 'next/link';
import { Fragment } from 'react';
import { HiCheckCircle } from 'react-icons/hi2';
import { MdError } from 'react-icons/md';
import { PiNotePencilBold } from 'react-icons/pi';

interface Props {
  sequencia_id: number;
}

export function ColetasTable({ sequencia_id }: Props) {
  const { data: pontos } = usePontosBySequenciaId(sequencia_id);
  const { data: coletas } = useColetas({ sequencia_id });

  if (!pontos || !coletas) {
    return null;
  }

  return (
    <Fragment>
      {pontos.map((ponto, index) => (
        <PontoColetas
          key={`${ponto.id}-${index}`}
          ponto={ponto}
          coletas={coletas}
        />
      ))}
    </Fragment>
  );
}

interface PontoColetasProps {
  ponto: PontoDto;
  coletas: ColetaDto[];
}

function PontoColetas({ ponto, coletas }: PontoColetasProps) {
  const coletasDoPonto = coletas.filter((c) => c.ponto.id === ponto.id);

  return (
    <div className="m-4 border-2 border-gray-300 p-4">
      <PontoHeader ponto={ponto} />
      <T.Table className="mb-4 w-full border-2">
        <TableHeader />
        <TableBody coletas={coletasDoPonto} />
      </T.Table>
    </div>
  );
}

function PontoHeader({ ponto }: { ponto: PontoDto }) {
  return (
    <div className="flex w-full flex-col items-start gap-2 bg-white-200 p-2">
      <Button variant="none" size="none" asChild>
        <Link
          className="text-left text-lg text-slate-500 hover:text-slate-600"
          href={`/admin/edificacoes/${ponto.edificacao.codigo}/editar`}
        >
          Edificação: {ponto.edificacao.codigo} - {ponto.edificacao.nome}
        </Link>
      </Button>
      <Button variant="none" size="none" asChild>
        <Link
          href={`/admin/pontos/${ponto.id}`}
          className="text-left text-sm text-slate-500 hover:text-slate-600"
        >
          Ponto de coleta {String(ponto.id).padStart(4, '0')}
          {' - ' + ponto.localizacao}
          {ponto.tombo && ` - Tombo ${ponto.tombo}`}
        </Link>
      </Button>
    </div>
  );
}

function TableHeader() {
  return (
    <T.Head className="bg-primary-500 text-left">
      <T.Col>ID</T.Col>
      <T.Col>Ordem</T.Col>
      <T.Col>Coliformes Totais</T.Col>
      <T.Col>Escherichia coli</T.Col>
      <T.Col>Turbidez</T.Col>
      <T.Col>Cloro residual livre</T.Col>
      <T.Col>Temperatura</T.Col>
      <T.Col>Cor</T.Col>
      <T.Col>Status</T.Col>
      <T.Col></T.Col>
    </T.Head>
  );
}

function TableBody({ coletas }: { coletas: ColetaDto[] }) {
  if (coletas.length === 0) {
    return (
      <T.Body className="bg-white">
        <T.Row className="text-left">
          <T.Cell colSpan={10} className="text-center">
            Não há coleta registrada
          </T.Cell>
        </T.Row>
      </T.Body>
    );
  }

  return (
    <T.Body className="bg-white">
      {coletas.map((coleta) => (
        <ColetaRow key={coleta.id} coleta={coleta} />
      ))}
    </T.Body>
  );
}

function ColetaRow({ coleta }: { coleta: ColetaDto }) {
  return (
    <T.Row className="text-left">
      <T.Cell>{coleta.id}</T.Cell>
      <T.Cell>{coleta.ordem % 2 === 1 ? 'Coleta' : 'Recoleta'}</T.Cell>
      <T.Cell>{coleta.coliformes_totais ? 'Sim' : 'Não'}</T.Cell>
      <T.Cell>{coleta.escherichia ? 'Sim' : 'Não'}</T.Cell>
      <T.Cell>{turbidezMask.mask(floatToString(coleta.turbidez))}</T.Cell>
      <T.Cell>
        {cloroMask.mask(floatToString(coleta.cloro_residual_livre))}
      </T.Cell>
      <T.Cell>{temperaturaMask.mask(floatToString(coleta.temperatura))}</T.Cell>
      <T.Cell>{corMask.mask(floatToString(coleta.cor))}</T.Cell>
      <T.Cell>
        {coleta.status ? (
          <span className="text-green-500">
            <HiCheckCircle size={24} />
          </span>
        ) : (
          <span className="text-red-400">
            <MdError size={24} />
          </span>
        )}
      </T.Cell>
      <T.Cell>
        <Link
          href={`/admin/sequencias/${coleta.sequencia_id}/coletas/${coleta.id}/editar`}
        >
          <Button
            variant="none"
            size="sm"
            className="text-left text-sm text-slate-500 hover:text-slate-600"
          >
            <PiNotePencilBold />
          </Button>
        </Link>
      </T.Cell>
    </T.Row>
  );
}
