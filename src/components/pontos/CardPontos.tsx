import { useEffect, useState } from "react";
import { Ponto, fetchEdificacao, Edificacao } from "@/utils/api_consumer";

function useEdificacao(url: string) {
    const [edificacao, setEdificacao] = useState<Edificacao | null>(null)

    useEffect(() => {
        fetch(url)
            .then(resp => resp.json())
            .then(data => setEdificacao(data))
    }, [])

    return edificacao
}

export default function CardPonto(props: { ponto: Ponto }) {
    const { ponto } = props;
    const edificacao = useEdificacao('http://localhost:8000' +  ponto.edificacao_url)
    
    const view = () => {
        window.location
    }
    
    return ponto && (
        <div className="relative w-[260px] px-2 py-4 aspect-square items-center flex flex-col justify-between bg-white rounded-md shadow-lg border border-neutral-300 text-center">
            <h3>{edificacao?.codigo}</h3>
            <h2 className="text-xl text-center">{edificacao?.nome}</h2>
            <p className="text-sm">{ponto.tipo === 1 ? 'Bebedouro' : 'RPS'}</p>
            <p className="text-sm">{ponto.ambiente}</p>

            <button
                onClick={view}
                className="filled-button bg-primary-500 rounded-md p-3 text-xs font-semibold text-white"
            >
                <i className="bi bi-eye-fill"></i>
                Detalhes
            </button>
        </div>
    );
}
