import { useEffect, useState } from "react";
import { Coleta, Edificacao, ParametroReferencia, Ponto, Sequencia, Solicitacao, Usuario } from "@/utils/types";

// const token = localStorage.getItem('token')
const token = "eyJ"
// TODO: Add token to ALL fetch requests

export function toURLParams(data: Object) {
    let params = [];

    for (const [key, value] of Object.entries(data)) {
        if (value) {
            params.push(key + "=" + value);
        }
    }

    return params.join('&');
}

export function formatDate(date: string) {
    const d = new Date(date);
    const hour = d.toLocaleTimeString().slice(0, 5).replace(':', 'h');
    return `${d.toLocaleDateString()} ${hour}`;
}

export function useEdificacao(codigo_edificacao: string) {
    const [edificacao, setEdificacao] = useState<Edificacao>();

    useEffect(() => {
        (async () => {
            if (!codigo_edificacao) return;
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/v1/edificacoes/" + codigo_edificacao);
            setEdificacao((await response.json()));
        })()
    }, [codigo_edificacao]);

    return edificacao;
}

export function useEdificacoes() {
    const [edificacoes, setEdificacoes] = useState<Edificacao[]>([]);

    useEffect(() => {
        (async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/edificacoes?limit=10000`, { cache: "no-cache" });
            setEdificacoes((await response.json()).items);
        })();
    }, []);

    return edificacoes;
}

export function delEdificacao(codigo_edificacao: string) {

    (async () => {
        if (!codigo_edificacao) return;
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/v1/edificacoes/" + codigo_edificacao, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    })()

}


export function usePonto(id_ponto: number) {
    const [ponto, setPonto] = useState<Ponto>();

    const url = process.env.NEXT_PUBLIC_API_URL + '/api/v1/pontos/' + id_ponto;
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }

    useEffect(() => {
        (async () => {
            if (!id_ponto) return;
            const response = await fetch(url, requestOptions);
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
            let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/pontos?limit=10000`, { cache: "no-cache" });
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

export function useColetasByPonto(id_ponto: number) {
    const [coletas, setColetas] = useState<Coleta[]>([]);

    useEffect(() => {
        (async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/v1/pontos/' + id_ponto + '/coletas');
            const coletas = await response.json();

            setColetas(coletas);
        })();
    }, [id_ponto]);

    return coletas;
}

export function useLastColetaByPonto(id_ponto: number) {
    const [coleta, setColeta] = useState<Coleta | null>(null);

    const url = process.env.NEXT_PUBLIC_API_URL + '/api/v1/pontos/' + id_ponto + '/coletas';
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }

    useEffect(() => {
        (async () => {
            const response = await fetch(url, requestOptions);
            const coletas = await response.json();

            setColeta(coletas[coletas.length - 1]);
        })();
    }, [id_ponto]);

    return coleta;
}

export function useParametrosReferencia() {
    const [parametrosReferencia, setParametrosReferencia] = useState<ParametroReferencia>();

    const url = process.env.NEXT_PUBLIC_API_URL + '/api/v1/parametros_referencia';
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }

    useEffect(() => {
        (async () => {
            const response = await fetch(url, requestOptions);
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

export function useSolicitacoes() {
    const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([]);

    useEffect(() => {
        (async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/v1/solicitacoes');
            const data = await response.json();
            setSolicitacoes(data.items);
        })();
    }, []);

    return solicitacoes;
}

export function useSolicitacao(id_solicitacao: number) {
    const [solicitacao, setSolicitacao] = useState<Solicitacao | null>(null);

    useEffect(() => {
        (async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/v1/solicitacoes/' + id_solicitacao);
            const solicitacao = await response.json();

            setSolicitacao(solicitacao);
        })();
    }, [id_solicitacao]);

    return solicitacao;
}
