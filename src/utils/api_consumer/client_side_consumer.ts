import { useEffect, useState } from "react";
import { Edificacao, Ponto } from "@/utils/types";

export function useEdificacao(codigo_edificacao: string) {
    const [edificacao, setEdificacao] = useState<Edificacao>();

    useEffect(() => {
        (async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/v1/edificacoes/" + codigo_edificacao);
            const data = await response.json();
            setEdificacao(data);
        })()
    }, [codigo_edificacao]);

    return edificacao;
}

export function useEdificacoes() {
    const [edificacoes, setEdificacoes] = useState<Edificacao[]>([]);

    useEffect(() => {
        (async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/v1/edificacoes");
            setEdificacoes((await response.json()).items);
        })();
    }, []);

    return edificacoes;
}

export function usePonto(id_ponto: number) {
    const [ponto, setPonto] = useState<Ponto>();

    useEffect(() => {
        (async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/v1/pontos/' + id_ponto);
            const ponto = await response.json();

            setPonto(ponto);
        })();
    }, [id_ponto]);

    return ponto;
}