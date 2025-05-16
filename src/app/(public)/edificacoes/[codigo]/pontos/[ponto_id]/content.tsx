'use client';

import { useColetaPublica } from '@/core/components/coleta/coleta.service';
import { useReferencia } from '@/core/components/referencia/referencia.service';
import { checkInterval } from '@/lib/utils';
import { Suspense } from 'react';

interface ColetaPublicaProps {
  ponto_id: number;
}

interface ParametrosCardProps {
  titulo: string;
  valor: string | number;
  status: boolean;
  statusText: string;
  referenceText: string;
  isHtmlTitle?: boolean;
  isRequired?: boolean;
}

const ParametrosCard = ({
  titulo: title,
  valor,
  status,
  statusText,
  referenceText,
  isHtmlTitle = false,
  isRequired = true,
}: ParametrosCardProps) => {
  const bgColor = status ? 'bg-green-100' : 'bg-red-100';

  return (
    <div
      className={`flex w-full items-center justify-between rounded-lg p-6 shadow ${isRequired ? bgColor : 'bg-white'}`}
    >
      <div>
        {isHtmlTitle ? (
          <h1
            className="text-lg font-bold"
            dangerouslySetInnerHTML={{ __html: title }}
          />
        ) : (
          <h1 className="text-lg font-bold">{title}</h1>
        )}
        <p className="text-md p-2">
          {valor} <br />
          {statusText}
        </p>
        <span
          className="text-sm text-gray-700"
          dangerouslySetInnerHTML={{ __html: referenceText }}
        />
      </div>
    </div>
  );
};

export function ColetaPublica({ ponto_id }: ColetaPublicaProps) {
  const { data: coleta } = useColetaPublica(ponto_id);
  const { data: referencia } = useReferencia();

  if (!coleta) {
    return <div>Sem coleta registrada</div>;
  }

  const turbidezStatus = checkInterval(
    coleta.turbidez,
    referencia?.min_turbidez,
    referencia?.max_turbidez,
  );

  const cloroStatus = checkInterval(
    coleta.cloro_residual_livre,
    referencia?.min_cloro_residual_livre,
    referencia?.max_cloro_residual_livre,
  );

  const temperaturaStatus = checkInterval(
    coleta.temperatura,
    referencia?.min_temperatura,
    referencia?.max_temperatura,
  );

  const corStatus = checkInterval(
    coleta.cor,
    referencia?.min_cor,
    referencia?.max_cor,
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-wrap gap-4">
        <ParametrosCard
          titulo="Coliformes totais"
          valor={`${coleta.coliformes_totais ? 'PRESENÇA' : 'AUSÊNCIA'} em 100 mL`}
          status={!coleta.coliformes_totais}
          statusText={
            coleta.coliformes_totais ? 'Não conformidade' : 'Em conformidade'
          }
          referenceText="VMP<sup>(1)</sup>: Ausência em 100 mL"
          isRequired
        />

        <ParametrosCard
          titulo="<i>Escherichia coli</i>"
          valor={`${coleta.escherichia ? 'PRESENÇA' : 'AUSÊNCIA'} em 100 mL`}
          status={!coleta.escherichia}
          statusText={
            !coleta.escherichia ? 'Não conformidade' : 'Em conformidade'
          }
          referenceText={`VMP<sup>(1)</sup>: ${coleta.escherichia ? 'Presença' : 'Ausência'} em 100 mL`}
          isHtmlTitle
          isRequired
        />

        <ParametrosCard
          titulo="Turbidez"
          valor={`${coleta.turbidez} uT`}
          status={turbidezStatus}
          statusText={turbidezStatus ? 'Em conformidade' : 'Não conformidade'}
          referenceText={`VMP<sup>(1)</sup>: ${referencia?.max_cloro_residual_livre} uT`}
          isRequired
        />

        <ParametrosCard
          titulo="Cloro residual livre"
          valor={`${coleta.cloro_residual_livre} mg/L`}
          status={cloroStatus}
          statusText={cloroStatus ? 'Em conformidade' : 'Não conformidade'}
          referenceText={`Entre<sup>(1)</sup> ${referencia?.min_cloro_residual_livre} e ${referencia?.max_cloro_residual_livre} mg/L`}
          isRequired
        />

        <ParametrosCard
          titulo="Cor"
          valor={`${coleta.cor} uH`}
          status={corStatus}
          statusText={corStatus ? 'Em conformidade' : 'Não conformidade'}
          referenceText={`Entre<sup>(1)</sup> ${referencia?.min_cor} e ${referencia?.max_cor} uH`}
          isRequired
        />

        <ParametrosCard
          titulo="Temperatura"
          valor={`${coleta.temperatura} ºC`}
          status={temperaturaStatus}
          statusText=""
          referenceText={`Ref. assumida<sup>(2)</sup> ${referencia?.min_temperatura} a ${referencia?.max_temperatura} °C`}
          isRequired={false}
        />

        <p className="w-full p-4 text-sm text-gray-700">
          (1): Valores máximos permitidos de acordo com o Anexo XX da Portaria
          de Consolidação GM/MS nº 5, de 28 de setembro de 2017 alterado pela
          Portaria GM/MS nº 888, de 04 de maio de 2021 e pela Portaria GM/MS nº
          2472, de 28 de setembro de 2021.
          <br />
          <br />
          (2): Referência adotada com base na Portaria INMETRO n.º 394, de 25 de
          agosto de 2014, para &quot;equipamento elétrico para consumo de água
          com refrigeração&quot;. Observa-se que: (a) a medição de temperatura
          executada não segue as condições de ensaio previstas nesta Portaria;
          (b) o valor de referência poderá ser distinto do adotado no presente
          projeto, a depender das especificações constantes no manual de
          instruções do equipamento.
        </p>
      </div>
    </Suspense>
  );
}
