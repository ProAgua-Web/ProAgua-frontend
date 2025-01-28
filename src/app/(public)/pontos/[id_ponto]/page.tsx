'use client';

import Header from '@/components/layout/Header';
import {
  useLastColetaByPonto,
  useParametrosReferencia,
  usePonto,
} from '@/utils/api/client_side_consumer';
import { Coleta, TIPOS_PONTOS } from '@/utils/types';
import Image from 'next/image';

import Alert from '/public/alert.svg';
import Conformidade from '/public/conformidade.svg';
import NaoConformidade from '/public/nao_conformidade.svg';

function PointDashboard(props: { coleta: Coleta }) {
  const { coleta } = props;
  const bg_color_ok = 'bg-green-200';
  const bg_color_not_ok = 'bg-red-200';
  const bg_color_alert = 'bg-yellow-200';

  const referencia = useParametrosReferencia();

  const turbidezInterval = () => {
    if (
      referencia?.min_turbidez != null &&
      coleta.turbidez < referencia.min_turbidez
    ) {
      return false;
    }
    if (
      referencia?.max_turbidez != null &&
      coleta.turbidez > referencia.max_turbidez
    ) {
      return false;
    }
    return true;
  };

  const cloroInterval = () => {
    if (
      referencia?.min_cloro_residual_livre != null &&
      coleta.cloro_residual_livre < referencia.min_cloro_residual_livre
    ) {
      return false;
    }
    if (
      referencia?.max_cloro_residual_livre != null &&
      coleta.cloro_residual_livre > referencia.max_cloro_residual_livre
    ) {
      return false;
    }
    return true;
  };

  const temperaturaInterval = () => {
    if (
      referencia?.min_temperatura != null &&
      coleta.temperatura < referencia.min_temperatura
    ) {
      return false;
    }
    if (
      referencia?.max_temperatura != null &&
      coleta.temperatura > referencia.max_temperatura
    ) {
      return false;
    }
    return true;
  };

  const corInterval = () => {
    if (referencia?.min_cor != null && coleta.cor < referencia.min_cor) {
      return false;
    }
    if (referencia?.max_cor != null && coleta.cor > referencia.max_cor) {
      return false;
    }
    return true;
  };

  return (
    <div className="flex flex-wrap gap-4">
      <div
        className={`flex w-full items-center justify-between rounded-lg p-6 shadow ${coleta.coliformes_totais ? bg_color_not_ok : bg_color_ok}`}
      >
        <div>
          <h1 className="text-lg font-bold">Coliformes totais</h1>
          <p className="text-md p-2">
            {coleta.coliformes_totais ? 'PRESENÇA' : 'AUSÊNCIA'} em 100 mL{' '}
            <br />
            {coleta.coliformes_totais ? 'Não conformidade' : 'Em conformidade'}
          </p>
          <span className="text-sm text-gray-700">
            VMP<sup>(1)</sup>: Ausência em 100 mL
          </span>
        </div>
        <Image
          src={coleta.coliformes_totais ? NaoConformidade : Conformidade}
          alt="Coliformes totais"
          className="h-24 w-24"
        />
      </div>

      <div
        className={`flex w-full items-center justify-between rounded-lg p-6 shadow ${coleta.escherichia ? bg_color_not_ok : bg_color_ok}`}
      >
        <div>
          <h1 className="text-lg font-bold">
            <i>Escherichia coli</i>
          </h1>
          <p className="text-md p-2">
            {coleta.escherichia ? 'PRESENÇA' : 'AUSÊNCIA'} em 100 mL <br />
            {coleta.escherichia ? 'Não conformidade' : 'Em conformidade'}
          </p>
          <span className="text-sm text-gray-700">
            VMP<sup>(1)</sup>: {coleta.escherichia ? 'Presença' : 'Ausência'} em
            100 mL
          </span>
        </div>
        <Image
          src={coleta.escherichia ? NaoConformidade : Conformidade}
          alt="Escherichia coli"
          className="h-24 w-24"
        />
      </div>

      <div
        className={`flex w-full items-center justify-between rounded-lg p-6 shadow ${turbidezInterval() ? bg_color_ok : bg_color_not_ok}`}
      >
        <div>
          <h1 className="text-lg font-bold">Turbidez</h1>
          <p className="text-md p-2">
            {coleta.turbidez} uT <br />
            {turbidezInterval() ? 'Em conformidade' : 'Não conformidade'}
          </p>
          <span className="text-sm text-gray-700">
            VMP<sup>(1)</sup>: {referencia?.max_cloro_residual_livre} uT
          </span>
        </div>
        <Image
          src={turbidezInterval() ? Conformidade : NaoConformidade}
          alt="Turbidez"
          className="h-24 w-24"
        />
      </div>

      <div
        className={`flex w-full items-center justify-between rounded-lg p-6 shadow ${cloroInterval() ? bg_color_ok : bg_color_not_ok}`}
      >
        <div>
          <h1 className="text-lg font-bold">Cloro residual livre</h1>
          <p className="text-md p-2">
            {coleta.cloro_residual_livre} mg/L <br />
            {cloroInterval() ? 'Em conformidade' : 'Não conformidade'}
          </p>
          <span className="text-sm text-gray-700">
            Entre<sup>(1)</sup> {referencia?.min_cloro_residual_livre} e{' '}
            {referencia?.max_cloro_residual_livre} mg/L
          </span>
        </div>
        <Image
          src={cloroInterval() ? Conformidade : NaoConformidade}
          alt="Cloro residual livre"
          className="h-24 w-24"
        />
      </div>

      <div
        className={`flex w-full items-center justify-between rounded-lg p-6 shadow ${!temperaturaInterval() && coleta.ponto.tipo == 1 ? bg_color_alert : 'bg-slate-100'}`}
      >
        <div>
          <h1 className="text-lg font-bold">Temperatura</h1>
          <p className="text-md p-2">{coleta.temperatura} ºC</p>

          {coleta.ponto.tipo == 1 && (
            <span className="text-sm text-gray-700">
              Ref. assumida<sup>(2)</sup> {referencia?.min_temperatura} a{' '}
              {referencia?.max_temperatura} °C
            </span>
          )}
        </div>

        {coleta.ponto.tipo == 1 && (
          <Image
            src={temperaturaInterval() ? Conformidade : Alert}
            alt="Temperatura"
            className="h-24 w-24"
          />
        )}
      </div>

      <div
        className={`flex w-full items-center justify-between rounded-lg p-6 shadow ${corInterval() ? bg_color_ok : bg_color_not_ok}`}
      >
        <div>
          <h1 className="text-lg font-bold">Cor</h1>
          <p className="text-md p-2">
            {coleta.cor} uH <br />
            {corInterval() ? 'Em conformidade' : 'Não conformidade'}
          </p>
          <span className="text-sm text-gray-700">
            Entre<sup>(1)</sup> {referencia?.min_cor} e {referencia?.max_cor} uH
          </span>
        </div>
        <Image
          src={corInterval() ? Conformidade : NaoConformidade}
          alt="Cor"
          className="h-24 w-24"
        />
      </div>
    </div>
  );
}

export default function Page(props: { params: { id_ponto: number } }) {
  const { params } = props;
  const ponto = usePonto(params.id_ponto);
  var coleta = useLastColetaByPonto(params.id_ponto);

  return (
    <>
      <Header />
      <div className="relative m-auto flex w-[clamp(320px,90vw-2rem,1200px)] flex-col items-center gap-8 p-8 pt-[calc(clamp(50px,8vh,100px)+2rem)]">
        <div className="w-full rounded border border-neutral-300 p-4 shadow">
          {/* ID ponto: {ponto?.id}<br /> */}
          <span className="text-md text-gray-700">UFERSA Campus Mossoró</span>
          <h1 className="text-2xl font-semibold">{ponto?.edificacao.nome}</h1>
          <p className="text-lg text-black">
            Ponto de Coleta -{' '}
            {ponto?.tipo == 2
              ? 'Torneira - ' + TIPOS_PONTOS[ponto?.tipo ?? 0]
              : TIPOS_PONTOS[ponto?.tipo ?? 0]}
            <br />
            Local - {ponto?.localizacao}
            <br />
            {coleta && coleta.data
              ? `Última coleta em ${new Date(coleta.data).toLocaleDateString()}`
              : 'Sem coleta registrada'}
          </p>
          <div className="mt-8">
            {coleta && <PointDashboard coleta={coleta} />}
          </div>
        </div>
        {coleta && (
          <p>
            (1): Valores máximos permitidos de acordo com o Anexo XX da Portaria
            de Consolidação GM/MS nº 5, de 28 de setembro de 2017 alterado pela
            Portaria GM/MS nº 888, de 04 de maio de 2021 e pela Portaria GM/MS
            nº 2472, de 28 de setembro de 2021.
            <br />
            <br />
            (2): Referência adotada com base na Portaria INMETRO n.º 394, de 25
            de agosto de 2014, para &quot;equipamento elétrico para consumo de
            água com refrigeração&quot;. Observa-se que: (a) a medição de
            temperatura executada não segue as condições de ensaio previstas
            nesta Portaria; (b) o valor de referência poderá ser distinto do
            adotado no presente projeto, a depender das especificações
            constantes no manual de instruções do equipamento.
          </p>
        )}
      </div>
    </>
  );
}
