import { useEffect, useState } from "react";
import { Coleta, Edificacao, ParametroReferencia, Ponto, PontoIn, Sequencia, SequenciaIn, Solicitacao, Usuario } from "@/utils/types";
import { getCookie } from "../cookies";

export class APIConsumer<Tin, Tout> {
    baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async get(id: string, cache: RequestCache = "no-cache") {
        const response = await fetch(this.baseUrl + id, {
            cache: cache,
            credentials: "include"
        });

        const data: Tout = await response.json()
        return data;
    }

    async list(cache: RequestCache = "no-cache", query: any = undefined) {
        let searchParams = "";
        
        if (query) {
            searchParams = new URLSearchParams(query).toString();
            searchParams = '?' + searchParams;
        }

        const response = await fetch(this.baseUrl + searchParams, {
            cache: cache,
            credentials: "include"
        });

        const data: Tout[] = (await response.json()).items;
        return data;
    }

    async post(data: Tin) {
        // Set request headers
        const headers: HeadersInit =  {
            "Content-Type": "application/json",
        };

        // Try to get the csrftoken in the cookies
        const csrfToken = getCookie("csrftoken");

        if (csrfToken) {
            headers["X-CSRFToken"] = csrfToken;
        }

        // Send request
        const response = await fetch(this.baseUrl, {
            method: "POST",
            headers: headers,
            credentials: "include",
            body: JSON.stringify(data)
        })

        return response;
    }

    async delete(id: string) {
        // Set request headers
        const headers: HeadersInit =  {
        };

        // Try to get the csrftoken in the cookies
        const csrfToken = getCookie("csrftoken");

        if (csrfToken) {
            headers["X-CSRFToken"] = csrfToken;
        }

        // Send request
        const response = await fetch(this.baseUrl + id, {
            method: "DELETE",
            headers: headers,
            credentials: "include"
        })

        return response;
    }

    async put(id: string, data: Tin) {
        // Set request headers
        const headers: HeadersInit =  {
            "Content-Type": "application/json",
        };

        // Try to get the csrftoken in the cookies
        const csrfToken = getCookie("csrftoken");

        if (csrfToken) {
            headers["X-CSRFToken"] = csrfToken;
        }

        // Send request
        const response = await fetch(this.baseUrl + id, {
            method: "PUT",
            headers: headers,
            credentials: "include",
            body: JSON.stringify(data),
        })

        return response;
    }
}

export const consumerEdficacao = new APIConsumer<Edificacao, Edificacao>(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/edificacoes/`);
export const consumerPonto = new APIConsumer<PontoIn, Ponto>(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/pontos/`);
export const consumerColeta = new APIConsumer<Coleta, Coleta>(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/coletas/`);
export const consumerSolicitacao = new APIConsumer<Solicitacao, Solicitacao>(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/solicitacoes/`);
export const consumerSequencia = new APIConsumer<SequenciaIn, Sequencia>(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/sequencias/`);
export const consumerUsuario = new APIConsumer<Usuario, Usuario>(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/usuarios/`);
export const consumerParametrosReferencia = new APIConsumer<ParametroReferencia, ParametroReferencia>(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/parametros_referencia/`);


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
        consumerEdficacao.get(codigo_edificacao)
            .then(data => setEdificacao(data))
            .catch(err => alert("Ocorreu um erro durante a requisição."))
    }, [codigo_edificacao])
    return edificacao
}

export function useEdificacoes() {
    const [edificacoes, setEdificacoes] = useState<Edificacao[]>([]);
    useEffect(() => {
        consumerEdficacao.list()
            .then(data => setEdificacoes(data))
            .catch(err => alert("Ocorreu um erro durante a requisição."))
    }, [])
    return edificacoes
}

export function delEdificacao(codigo_edificacao: string) {

    (async () => {
        if (!codigo_edificacao) return;
        const response = await consumerEdficacao.delete(codigo_edificacao);

        if (response.status === 200) {
            alert("Edificação deletada com sucesso!");
        } else if (response.status === 404) {
            alert("Edificação não encontrada!");
        } else if (response.status === 409) {
            alert("Edificação não pode ser deletada pois possui pontos associados!");
        }
    })()

}

export function usePonto(id_ponto: number) {
    const [ponto, setPonto] = useState<Ponto>();
    useEffect(() => {
        consumerPonto.get(id_ponto.toString())
            .then(data => setPonto(data))
            .catch(err => alert("Ocorreu um erro durante a requisição."))
    }, [id_ponto])
    return ponto
}

export function usePontos(codigo_edificacao: string | null = null, id_sequencia: number | null = null) {
    const [pontos, setPontos] = useState<Ponto[]>([]);
    useEffect(() => {
        consumerPonto.list('no-cache', {limit: 10000})
            .then(data => setPontos(data))
            .catch(err => alert("Ocorreu um erro durante a requisição."))
    }, [])
    return pontos
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

export async function delPonto(id_ponto: number) {
    if (!id_ponto) return;
    const response = await consumerPonto.delete(id_ponto.toString());

    if (response.status === 200) {
        alert("Ponto deletado com sucesso!");
    } else if (response.status === 404) {
        alert("Ponto não encontrado!");
    } else if (response.status === 409) {
        alert("Ponto não pode ser deletado pois possui coletas ou sequência de coleta associadas!");
    }

    return response;
}

export function useSequencias() {
    const [sequencias, setSequencias] = useState<Sequencia[]>([]);

    useEffect(() => {
        consumerSequencia.list()
            .then(data => setSequencias(data))    
    }, []);

    return sequencias;
}

export function useSequencia(id_sequencia: number) {
    const [sequencia, setSequencia] = useState<Sequencia | null>(null);

    useEffect(() => {
        (async () => {
            const csrftoken = await getCookie('csrftoken');
            if (csrftoken === null) {
                throw "Não há csrf token"
            }

            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/v1/sequencias/' + id_sequencia, {
                headers: {
                    "X-CSRFToken": csrftoken,
                },
                credentials: "include"
            });
            const sequencia = await response.json();

            setSequencia(sequencia);
        })();
    }, [id_sequencia]);

    return sequencia;
}

// TODO: refatorar função
export function useColetaBySequencia(id_sequencia: number) {
    const [coletas, setColetas] = useState<Coleta[]>([]);

    useEffect(() => {
        (async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/v1/sequencias/' + id_sequencia + '/coletas', {
                    'credentials': 'include'
                }
            );
            const coletas = await response.json();
            setColetas(coletas);
        })();
    }, [id_sequencia]);

    return coletas;
}

export function useColeta(id_coleta: number) {
    const [coleta, setColeta] = useState<Coleta | null>(null);

    useEffect(() => {
        consumerColeta.get(id_coleta.toString())
            .then(data => setColeta(data));
    }, [id_coleta]);

    return coleta;
}

export function useColetas() {
    const [coletas, setColetas] = useState<Coleta[]>([]);

    useEffect(() => {
        consumerColeta.list()
            .then(data => setColetas(data));
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
            // 'Authorization': `Bearer ${token}`
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
            // 'Authorization': `Bearer ${token}`
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
            const responsaveis = await consumerUsuario.list();
            setUsuarios(responsaveis);
        })();
    }, []);

    return responsaveis;
}

export function useUsuario(username: string) {
    const [usuario, setUsuario] = useState<Usuario | null>(null);

    useEffect(() => {
        consumerUsuario.get(username)
            .then(data => setUsuario(data))    
    }, [username]);

    return usuario;
}

export function useSolicitacoes() {
    const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([]);

    useEffect(() => {
            consumerSolicitacao.list()
                .then(data => setSolicitacoes(data));
    }, []);

    return solicitacoes;
}

export function useSolicitacao(id_solicitacao: number) {
    const [solicitacao, setSolicitacao] = useState<Solicitacao | null>(null);

    useEffect(() => {
        consumerSolicitacao.get(id_solicitacao.toString())
            .then(data => setSolicitacao(data));
    }, [id_solicitacao]);

    return solicitacao;
}

export function downloadSolictacao(id_solicitacao: number) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/solicitacoes/${id_solicitacao}/document`;
    window.open(url, '_blank');
}