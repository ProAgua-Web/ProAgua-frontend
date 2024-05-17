import { useEffect, useState } from "react";
import { Coleta, Edificacao, ParametroReferencia, Ponto, Sequencia, Usuario } from "@/utils/types";

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

export function usePontos(codigo_edificacao: string | null = null, id_sequencia: number | null = null) {
    const [pontos, setPontos] = useState<Ponto[]>([]);

    useEffect(() => {
        (async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/v1/pontos/');
            const pontos = (await response.json()).items;

            setPontos(pontos);
        })();
    }, [codigo_edificacao, id_sequencia]);

    return pontos;
}

export function usePontosAmontante(ponto: Ponto | null) {
    const [pontos, setPontos] = useState<Ponto[]>([]);

    useEffect(() => {
        (async () => {
            let tempPontos: Ponto[] = [];

            const fetchPontosAmontante = async (ponto: Ponto) => {
                tempPontos = [...tempPontos, ponto];

                if (ponto.amontante) {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/pontos/${ponto.amontante.id}`);
                    const pontoAmontante: Ponto = await response.json();
                    await fetchPontosAmontante(pontoAmontante);
                }
            };

            if (ponto) {
                await fetchPontosAmontante(ponto);
                setPontos(tempPontos);
            }
        })();
    }, [ponto]);

    return pontos;
}

export function useSequencias() {
    const [sequencias, setSequencias] = useState<Sequencia[]>([]);

    useEffect(() => {
        (async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/v1/sequencias/');
            const sequencias = await response.json();

            setSequencias(sequencias.items);
        })();
    }, []);

    return sequencias;
}

export function useSequencia(id_sequencia: number) {
    const [sequencia, setSequencia] = useState<Sequencia | null>(null);

    useEffect(() => {
        (async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/v1/sequencias/' + id_sequencia);
            const sequencia = await response.json();

            setSequencia(sequencia);
        })();
    }, [id_sequencia]);

    return sequencia;
}



export function useColetaBySequencia(id_sequencia: number) {
    const [coletas, setColetas] = useState<Coleta[]>([]);

    useEffect(() => {
        (async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/v1/sequencias/' + id_sequencia + '/coletas');
            const coletas = await response.json();

            setColetas(coletas);
        })();
    }, [id_sequencia]);

    return coletas;
}

export function useColeta(id_coleta: number) {
    const [coleta, setColeta] = useState<Coleta | null>(null);

    useEffect(() => {
        (async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/v1/coletas/' + id_coleta);
            const coleta = await response.json();

            setColeta(coleta);
        })();
    }, [id_coleta]);

    return coleta;
}

export function useColetas() {
    const [coletas, setColetas] = useState<Coleta[]>([]);

    useEffect(() => {
        (async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/v1/coletas');
            const coletas = await response.json();

            setColetas(coletas);
        })();
    }, []);

    return coletas;
}

export function useParametrosReferencia() {
    const [parametrosReferencia, setParametrosReferencia] = useState<ParametroReferencia>();

    useEffect(() => {
        (async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/v1/parametros_referencia');
            const parametrosReferencia = await response.json();

            setParametrosReferencia(parametrosReferencia);
        })();
    }, []);

    return parametrosReferencia;
}

export function useUsuarios() {
    const [responsaveis, setUsuarios] = useState<Usuario[]>([]);

    useEffect(() => {
        (async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/v1/usuarios/');
            const responsaveis = (await response.json()).items;

            setUsuarios(responsaveis);
        })();
    }, []);

    return responsaveis;
}

export function useUsuario(username: string) {
    const [usuario, setUsuario] = useState<Usuario | null>(null);

    useEffect(() => {
        (async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/v1/usuarios/' + username);
            const sequencia = await response.json();

            setUsuario(sequencia);
        })();
    }, [username]);

    return usuario;
}