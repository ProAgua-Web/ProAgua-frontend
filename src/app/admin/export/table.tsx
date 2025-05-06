'use client';
import { T } from '@/components/coletas-table';
import { type ColetaDto } from '@/core/components/coleta/coleta.model';
import { useColetas } from '@/core/components/coleta/coleta.service';
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
import { useQueryState } from 'nuqs';
import { Fragment } from 'react';
import { HiCheckCircle } from 'react-icons/hi2';
import { MdError } from 'react-icons/md';

export function ExportTable() {
  const [codigo_edificacao] = useQueryState('codigo_edificacao', {
    defaultValue: '',
  });
  const [responsavel] = useQueryState('responsavel', {
    defaultValue: '',
  });
  const [data_minima] = useQueryState('data_minima', {
    defaultValue: '',
  });
  const [data_maxima] = useQueryState('data_maxima', {
    defaultValue: '',
  });
  const [temperatura_minima] = useQueryState('temperatura_minima', {
    defaultValue: '',
  });
  const [temperatura_maxima] = useQueryState('temperatura_maxima', {
    defaultValue: '',
  });
  const [cloro_residual_livre_minimo] = useQueryState(
    'cloro_residual_livre_minimo',
    {
      defaultValue: '',
    },
  );
  const [cloro_residual_livre_maximo] = useQueryState(
    'cloro_residual_livre_maximo',
    {
      defaultValue: '',
    },
  );
  const [turbidez_minima] = useQueryState('turbidez_minima', {
    defaultValue: '',
  });
  const [turbidez_maxima] = useQueryState('turbidez_maxima', {
    defaultValue: '',
  });
  const [coliformes_totais] = useQueryState('coliformes_totais', {
    defaultValue: 'all',
  });
  const [escherichia] = useQueryState('escherichia', {
    defaultValue: 'all',
  });
  const [cor_minima] = useQueryState('cor_minima', {
    defaultValue: '',
  });
  const [cor_maxima] = useQueryState('cor_maxima', {
    defaultValue: '',
  });
  const [ordem] = useQueryState('ordem', {
    defaultValue: '',
  });

  const params = {
    ...(codigo_edificacao && { codigo_edificacao }),
    ...(responsavel && { responsavel }),
    ...(data_minima && { data_minima }),
    ...(data_maxima && { data_maxima }),
    ...(temperatura_minima && {
      temperatura_minima: parseFloat(temperatura_minima),
    }),
    ...(temperatura_maxima && {
      temperatura_maxima: parseFloat(temperatura_maxima),
    }),
    ...(cloro_residual_livre_minimo && {
      cloro_residual_livre_minimo: parseFloat(cloro_residual_livre_minimo),
    }),
    ...(cloro_residual_livre_maximo && {
      cloro_residual_livre_maximo: parseFloat(cloro_residual_livre_maximo),
    }),
    ...(turbidez_minima && { turbidez_minima: parseFloat(turbidez_minima) }),
    ...(turbidez_maxima && { turbidez_maxima: parseFloat(turbidez_maxima) }),
    ...(coliformes_totais !== 'all' && {
      coliformes_totais:
        coliformes_totais === 'true' || coliformes_totais === 'false',
    }),
    ...(escherichia !== 'all' && {
      escherichia: escherichia === 'true' || escherichia === 'false',
    }),
    ...(cor_minima && { cor_minima: parseFloat(cor_minima) }),
    ...(cor_maxima && { cor_maxima: parseFloat(cor_maxima) }),
    ...(ordem && { ordem }),
    limit: 0,
  };
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
