"use client";

import Header from "@/components/layout/Header";
import { useLastColetaByPonto, usePonto, useParametrosReferencia } from "@/utils/api_consumer/client_side_consumer";
import { Coleta } from "@/utils/types";
import { use } from "react";
import Image from "next/image";

import Conformidade from "/public/conformidade.svg";
import NaoConformidade from "/public/nao_conformidade.svg";
import Alert from "/public/alert.svg";

function PointDashboard(props: { coleta: Coleta }) {
    const { coleta } = props;
    const bg_color_ok = "bg-green-200";
    const bg_color_not_ok = "bg-red-200";
    const bg_color_alert = "bg-yellow-200";

    const referencia = useParametrosReferencia();

    const turbidezInterval = () => {
        if (referencia?.min_turbidez != null && coleta.turbidez < referencia.min_turbidez) {
            return false;
        }
        if (referencia?.max_turbidez != null && coleta.turbidez > referencia.max_turbidez) {
            return false;
        }
        return true;
    }

    const cloroInterval = () => {
        if (referencia?.min_cloro_residual_livre != null && coleta.cloro_residual_livre < referencia.min_cloro_residual_livre) {
            return false;
        }
        if (referencia?.max_cloro_residual_livre != null && coleta.cloro_residual_livre > referencia.max_cloro_residual_livre) {
            return false;
        }
        return true;
    }

    const temperaturaInterval = () => {
        if (referencia?.min_temperatura != null && coleta.temperatura < referencia.min_temperatura) {
            return false;
        }
        if (referencia?.max_temperatura != null && coleta.temperatura > referencia.max_temperatura) {
            return false;
        }
        return true;
    }

    return (
        <div className="flex gap-4 flex-wrap">
            <div className={`w-full flex justify-between items-center rounded-lg p-6 shadow ${coleta.coliformes_totais ? bg_color_not_ok : bg_color_ok}`}>
                <div>
                    <h1 className="text-lg font-bold">Coliformes totais</h1>
                    <p className="p-2 text-md">
                        {coleta.coliformes_totais ? "PRESENÇA" : "AUSÊNCIA"} em 100 mL <br />
                        {coleta.coliformes_totais ? "Em conformidade" : "Não conformidade"}
                    </p>
                    <span className="text-sm text-gray-700">VMP<sup>(1)</sup>: {coleta.coliformes_totais ? "Presença" : "Ausência"} em 100 mL</span>
                </div>
                <Image src={coleta.coliformes_totais ? NaoConformidade : Conformidade}
                    alt="Coliformes totais"
                    className="h-24 w-24" />
            </div>

            <div className={`w-full flex justify-between items-center rounded-lg p-6 shadow ${coleta.escherichia ? bg_color_not_ok : bg_color_ok}`}>
                <div>
                    <h1 className="text-lg font-bold">Escherichia coli</h1>
                    <p className="p-2 text-md">
                        {coleta.escherichia ? "PRESENÇA" : "AUSÊNCIA"} em 100 mL <br />
                        {coleta.escherichia ? "Em conformidade" : "Não conformidade"}
                    </p>
                    <span className="text-sm text-gray-700">VMP<sup>(1)</sup>: {coleta.escherichia ? "Presença" : "Ausência"} em 100 mL</span>
                </div>
                <Image src={coleta.escherichia ? NaoConformidade : Conformidade}
                    alt="Escherichia coli"
                    className="h-24 w-24" />
            </div>

            <div className={`w-full flex justify-between items-center rounded-lg p-6 shadow ${turbidezInterval() ? bg_color_ok : bg_color_not_ok}`}>
                <div>
                    <h1 className="text-lg font-bold">Turbidez</h1>
                    <p className="p-2 text-md">
                        {coleta.turbidez} uT <br />
                        {turbidezInterval() ? "Em conformidade" : "Não conformidade"}
                    </p>
                    <span className="text-sm text-gray-700">VMP<sup>(1)</sup>: {referencia?.max_cloro_residual_livre} uT</span>
                </div>
                <Image src={turbidezInterval() ? Conformidade : NaoConformidade}
                    alt="Turbidez"
                    className="h-24 w-24" />
            </div>

            <div className={`w-full flex justify-between items-center rounded-lg p-6 shadow ${cloroInterval() ? bg_color_ok : bg_color_not_ok}`}>
                <div>
                    <h1 className="text-lg font-bold">Cloro residual livre</h1>
                    <p className="p-2 text-md">
                        {coleta.cloro_residual_livre} mg/L <br />
                        {cloroInterval() ? "Em conformidade" : "Não conformidade"}
                    </p>
                    <span className="text-sm text-gray-700">Entre<sup>(1)</sup> {referencia?.min_cloro_residual_livre} e {referencia?.max_cloro_residual_livre} mg/L</span>
                </div>
                <Image src={cloroInterval() ? Conformidade : NaoConformidade}
                    alt="Cloro residual livre"
                    className="h-24 w-24" />
            </div>

            <div className={`w-full flex justify-between items-center rounded-lg p-6 shadow ${temperaturaInterval() ? bg_color_ok : bg_color_alert}`}>
                <div>
                    <h1 className="text-lg font-bold">Temperatura</h1>
                    <p className="p-2 text-md">
                        {coleta.temperatura} ºC <br />
                        {temperaturaInterval() ? "Em conformidade" : "Alerta"}
                    </p>
                    <span className="text-sm text-gray-700">Ref. assumida<sup>(2)</sup> {referencia?.min_temperatura} a {referencia?.max_temperatura} °C</span>
                </div>
                <Image src={temperaturaInterval() ? Conformidade : Alert}
                    alt="Temperatura"
                    className="h-24 w-24" />
            </div>
        </div>
    )
}

export default function Page(props: {
    params: { id_ponto: number }
}) {
    const { params } = props;
    const ponto = usePonto(params.id_ponto);
    var coleta = useLastColetaByPonto(params.id_ponto);

    return (
        <>
            <Header />
            <div className="relative m-auto flex w-[clamp(320px,90vw-2rem,1200px)] flex-col items-center gap-4 p-8 pt-[calc(clamp(50px,8vh,100px)+2rem)]">
                <div className="w-full p-4 rounded border border-neutral-300 shadow">
                    {/* ID ponto: {ponto?.id}<br /> */}
                    <span className="text-md text-gray-700">UFERSA Campus Mossoró</span>
                    <h1 className="text-2xl font-semibold">{ponto?.edificacao.nome}</h1>
                    <p className="text-lg text-black">
                        Ponto de Coleta - {ponto?.ambiente}<br />
                        {coleta && coleta.data ? `Última coleta em ${new Date(coleta.data).toLocaleDateString()}` : "Sem coleta registrada"}
                    </p>
                    <div className="mt-8">
                        {coleta && <PointDashboard coleta={coleta} />}
                    </div>
                </div>
            </div>

        </>
    )
}