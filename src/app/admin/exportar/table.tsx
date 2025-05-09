'use client';
import { T } from '@/components/coletas-table';
import { type ColetaDto } from '@/core/components/coleta/coleta.model';
import { useColetas } from '@/core/components/coleta/coleta.service';
import {
  buildColetaParams,
  useColetaQueryParams,
} from '@/core/components/coleta/coleta.utils';
import { edificacaoToString } from '@/core/components/edificacao/edificacao.utils';
import { pontoToString } from '@/core/components/ponto/ponto.utils';
import {
  cloroMask,
  corMask,
  temperaturaMask,
  turbidezMask,
} from '@/lib/input-mask';
import { floatToString, formatDate } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';
import { HiCheckCircle } from 'react-icons/hi2';
import { MdError } from 'react-icons/md';

export function ExportTable() {
  const queryParams = useColetaQueryParams();
  const params = buildColetaParams(queryParams);

  const { data: coletas = [] } = useColetas(params);

  return (
    <Fragment>
      <T.Table className="w-full">
        <TableHeader />
        <TableBody coletas={coletas ?? []} />
      </T.Table>
    </Fragment>
  );
}

function TableHeader() {
  return (
    <T.Head className="bg-primary-500 text-left">
      <T.Col className="sticky left-0 bg-primary-500">ID</T.Col>
      <T.Col>Edificação</T.Col>
      <T.Col>Ponto</T.Col>
      <T.Col>Ordem</T.Col>
      <T.Col className="hidden sm:table-cell">Coliformes Totais</T.Col>
      <T.Col className="hidden sm:table-cell">Escherichia coli</T.Col>
      <T.Col className="hidden md:table-cell">Turbidez</T.Col>
      <T.Col className="hidden md:table-cell">Cloro residual livre</T.Col>
      <T.Col className="hidden xl:table-cell">Temperatura</T.Col>
      <T.Col className="hidden md:table-cell">Cor</T.Col>
      <T.Col className="hidden md:table-cell">Data</T.Col>
      <T.Col className="sticky right-0 bg-primary-500">Status</T.Col>
      {/* <T.Col></T.Col> */}
    </T.Head>
  );
}

function TableBody({ coletas }: { coletas: ColetaDto[] }) {
  if (coletas.length === 0) {
    return (
      <T.Body className="bg-white">
        <T.Row className="text-left">
          <T.Cell colSpan={12} className="text-center">
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
  const router = useRouter();

  const handleRowClick = () => {
    router.push(`/admin/sequencias/${coleta.sequencia_id}/coletas`);
  };
  return (
    <T.Row
      className="group cursor-pointer text-left hover:bg-gray-100"
      onClick={handleRowClick}
    >
      <T.Cell className="sticky left-0 bg-white group-hover:bg-gray-100">
        {coleta.id}
      </T.Cell>
      <T.Cell>{edificacaoToString(coleta.ponto.edificacao)}</T.Cell>
      <T.Cell>{pontoToString(coleta.ponto)}</T.Cell>
      <T.Cell>{coleta.ordem % 2 === 1 ? 'Coleta' : 'Recoleta'}</T.Cell>
      <T.Cell className="hidden sm:table-cell">
        {coleta.coliformes_totais ? 'Sim' : 'Não'}
      </T.Cell>
      <T.Cell className="hidden sm:table-cell">
        {coleta.escherichia ? 'Sim' : 'Não'}
      </T.Cell>
      <T.Cell className="hidden md:table-cell">
        {turbidezMask.mask(floatToString(coleta.turbidez))}
      </T.Cell>
      <T.Cell className="hidden md:table-cell">
        {cloroMask.mask(floatToString(coleta.cloro_residual_livre))}
      </T.Cell>
      <T.Cell className="hidden xl:table-cell">
        {temperaturaMask.mask(floatToString(coleta.temperatura))}
      </T.Cell>
      <T.Cell className="hidden md:table-cell">
        {corMask.mask(floatToString(coleta.cor))}
      </T.Cell>
      <T.Cell className="hidden md:table-cell">
        {formatDate(coleta.data)}
      </T.Cell>
      <T.Cell className="sticky right-0 bg-white group-hover:bg-gray-100">
        {coleta.status ? (
          <span className="flex items-center justify-center text-green-500">
            <HiCheckCircle size={24} />
          </span>
        ) : (
          <span className="flex items-center justify-center text-red-400">
            <MdError size={24} />
          </span>
        )}
      </T.Cell>
    </T.Row>
  );
}
