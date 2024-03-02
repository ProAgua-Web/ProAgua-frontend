// id={item.id}
// amostragem={item.amostragem}
// ambiente_ponto={item.ambiente_ponto}
// codigo_edificacao={item.codigo_edificacao}
// nome_edificacao={item.nome_edificacao}
// tipo={item.tipo}

import { useEffect, useState } from "react"

export type Sequencia = {
    id: number
    amostragem:	number
    ponto_url: String
}

type SequenciaFull = {
    id: Number
    amostragem: Number
    ambiente_ponto: String
    codigo_edificacao: String
    nome_edificacao: String
    tipo: Number
}

const API_URL = 'http://127.0.0.1:8000';

export default function CardSequencia(props: {
    sequencia: Sequencia
}) {

    const [values, setValues] = useState<SequenciaFull | null>(null);
    const view = () => {
        window.location.href = `${API_URL}/sequencias_coletas/${props.sequencia.id}`;
    }
    
    useEffect(() => {
       ( async () => {
            const pontoUrl = API_URL + props.sequencia.ponto_url
            const ponto_resp = await fetch(pontoUrl)
            const ponto = await ponto_resp.json()

            const edificacaoUrl = API_URL + ponto.edificacao_url
            const edificacao_resp = await fetch(edificacaoUrl)
            const edificacao = await edificacao_resp.json()

            setValues({
                id: props.sequencia.id,
                amostragem: props.sequencia.amostragem,
                ambiente_ponto: ponto.ambiente,
                codigo_edificacao: edificacao.codigo,
                nome_edificacao: edificacao.nome,
                tipo: ponto.tipo,
            })
        })()
    });

    
    return values && (
        <div className="relative w-[260px] px-2 py-4 aspect-square items-center flex flex-col justify-between bg-white rounded-md shadow-lg border border-neutral-300 text-center">
            <h6>{ values?.id.toString() }</h6>
            <h3>{ values?.codigo_edificacao }</h3>
            <h2 className="text-xl text-center">{ values?.nome_edificacao }</h2>
            <p className="text-sm">{ values?.tipo == 1 ? 'Bebedouro' : 'RPS' }</p>
            <p className="text-sm">{ values?.ambiente_ponto }</p>
            <h5>Amostragem { values?.amostragem.toString() }</h5>

            <button 
                onClick={ view }
                className="filled-button bg-primary-500 rounded-md p-3 text-xs font-semibold text-white"
            >
                <i className="bi bi-eye-fill"></i>
                Detalhes
            </button>
        </div>
    )
}