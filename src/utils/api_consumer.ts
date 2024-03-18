import Sequencia from "@/app/(private)/sequencias_coletas/[sequencia_id]/page";
import { useEffect, useState } from "react";

export const API_BASE_URL = 'http://127.0.0.1:8000'


export type Ponto = {
    id: number;
    ambiente: string;
    edificacao_url: string;
    tipo: number;
    edificacao: Edificacao;
};

export type Sequencia = {
    id: number;
    amostragem: number;
    ponto_url: string;
    ponto?: Ponto;
};

export type Edificacao = {
    codigo: string;
    nome: string;
    campus: string;
    cronograma: number;
    imagem?: string;
    pontos_url: string;
};

export async function fetchJSON(url: string) {
    const response = await fetch(url);
    return response.json();
}

export async function fetchPonto(pontoUrl: string): Promise<Ponto> {
    const ponto = await fetchJSON(pontoUrl);
    return ponto;
}

export async function fetchEdificacao(
    edificacaoUrl: string,
): Promise<Edificacao> {
    const edificacao = await fetchJSON(edificacaoUrl);
    return edificacao;
}

export function useSequencia(id_sequencia: number) {
    const [values, setValues] = useState<Sequencia | null>(null);

    useEffect(() => {
        fetchJSON(API_BASE_URL + '/api/v1/sequencias/' + id_sequencia)
            .then((sequencia: Sequencia) => {
                setValues(sequencia);
            });
    }, []);

    return values;
}

export function useSequencias() {
    const [sequencias, setSequencias] = useState<Sequencia[]>([]);

    useEffect(() => {
        fetch(API_BASE_URL + "/api/v1/sequencias/?limit=100&offset=0")
            .then((resp) => resp.json())
            .then((data) => {
                setSequencias(
                    data.items.filter((item: any) => item.ponto_url !== null),
                );
            });
    }, []);

    return sequencias;
}

export function usePontos(api_url: string = '') {
    if (!api_url) {
        api_url = `${API_BASE_URL}/api/v1/pontos`;
    } else {
        api_url = `${API_BASE_URL}${api_url}`;
    }

    const [pontos, setPontos] = useState<Ponto[]>([]);

    useEffect(() => {
        fetchJSON(api_url)
            .then(data => {
                let items = data.items;
                setPontos(items);
            });
    }, [api_url]);

    return pontos;
}

export function useEdificacoes(api_url: string = '') {
    api_url = API_BASE_URL;
    const [edificacoes, setEdificacoes] = useState<Edificacao[]>([]);

    useEffect(() => {
        fetch(api_url + '/api/v1/edificacoes')
            .then((resp) => resp.json())
            .then((data) => setEdificacoes(data.items));
    }, []);

    return edificacoes;
}

export function useEdificacao(codigo_edificacao: string) {
    const [edificacao, setEdificacao] = useState<Edificacao | null>(null);
    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        fetchJSON(`${API_BASE_URL}/api/v1/edificacoes/${codigo_edificacao}`)
            .then(data => {
                setEdificacao(data);
                setLoaded(true);
            })

    }, []);

    return { edificacao, loaded };
}

export function usePonto(id_ponto: string) {
    const [ponto, setPonto] = useState<Ponto | null>(null);
    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        fetchJSON(`${API_BASE_URL}/api/v1/pontos/${id_ponto}`)
            .then(data => {
                setPonto(data);
                setLoaded(true);
            })
    }, [id_ponto]);

    return { ponto, loaded };
}
