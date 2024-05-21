"use client";

import Header from "@/components/layout/Header";
import { useLastColetaByPonto, usePonto, useParametrosReferencia } from "@/utils/api_consumer/client_side_consumer";
import { Coleta } from "@/utils/types";
import { use } from "react";

function PointDashboard(props: {coleta: Coleta}) {
    const { coleta } = props;
    const bg_color_ok = "bg-green-200";
    const bg_color_not_ok = "bg-red-200";

    const referencia = useParametrosReferencia();

    console.log(coleta)
    console.log(referencia);

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
            <div className={`w-full rounded-lg p-6 shadow ${coleta.coliformes_totais ? bg_color_not_ok : bg_color_ok}`}>
                <h1>Coliformes totais</h1>
                <p>
                    {coleta.coliformes_totais ? "Presença" : "Ausência"}
                </p>
            </div>
            
            <div className={`w-full rounded-lg p-6 shadow ${coleta.escherichia ? bg_color_not_ok : bg_color_ok}`}>
                <h1>Escherichia coli</h1>
                <p>
                    {coleta.escherichia ? "Presença" : "Ausência"}
                </p>
            </div>
            
            <div className={`w-full rounded-lg p-6 shadow ${turbidezInterval() ? bg_color_ok : bg_color_not_ok}`}>
                <h1>Turbidez</h1>
                <p>
                    {coleta.turbidez} uT
                </p>
            </div>
            
            <div className={`w-full rounded-lg p-6 shadow ${cloroInterval() ? bg_color_ok : bg_color_not_ok}`}>
                <h1>Cloro residual livre</h1>
                <p>
                    {coleta.cloro_residual_livre} mg/L
                </p>
            </div>

            <div className={`w-full rounded-lg p-6 shadow ${temperaturaInterval() ? bg_color_ok : bg_color_not_ok}`}>
                <h1>Temperatura</h1>
                <p>
                    {coleta.temperatura} ºC
                </p>
            </div>
        </div>
    )
}

export default function Page(props: { 
    params: { id_ponto:number }
}) {
    const { params } = props;
    const ponto = usePonto(params.id_ponto);    
    var coleta = useLastColetaByPonto(params.id_ponto);

    return (
        <>
            <Header />
            <div className="relative m-auto flex w-[clamp(320px,90vw-2rem,1200px)] flex-col items-center gap-4 p-8 pt-[calc(clamp(50px,8vh,100px)+2rem)]">
                <div className="w-full p-4 rounded border border-neutral-300 shadow">
                    ID ponto: {ponto?.id}<br />
                    Prédio: {ponto?.edificacao.codigo} - {ponto?.edificacao.nome} {ponto?.edificacao.campus}
                    <br />
                    Ambiente: {ponto?.ambiente}<br />
                    Status: {ponto?.status ? "Em conformidade" : "Não conforme"}<br />
                </div>
                <div className="mt-4">
                    {coleta && <PointDashboard coleta={coleta} />}
                </div>
            </div>
            
        </>
    )
}