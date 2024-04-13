import { API_BASE_URL } from "./config";

export async function getEdificacoes() {
    let resp = await fetch(`${API_BASE_URL}/api/v1/edificacoes`);
    const edificacoes: Edificacao[] = (await resp.json()).items;
    return edificacoes;
}

export type Ponto = {
    id: number;
    tombo: string;
    ambiente: string;
    edificacao_url: string;
    tipo: number;
    edificacao: Edificacao;
    status: boolean;
    status_message: string;
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

export type Coleta = {
    id: number;
    temperatura: number;
    cloro_residual_livre: number;
    turbidez: number;
    coliformes_totais: boolean;
    escherichia: boolean;
    cor: number;
    data: string;
    ordem: string;
    status: {
        status: boolean;
        message: string;
    };
    responsaveis_url: string;
    sequencia_url: string;
    ponto_url: string;
};

export type Usuario = {
    id: number;
    is_superuser: boolean;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    is_staff: boolean;
    is_active: boolean;
    date_joined: Date;
}

// export async function fetchJSON(url: string) {
//     const response = await fetch(url);

//     if (!response.ok) {
//         throw new Error("Erro durante requisição de dados.");
//     }
    
//     return response.json();
// }

// export async function fetchPonto(pontoUrl: string): Promise<Ponto> {
//     const ponto = await fetchJSON(pontoUrl);
//     return ponto;
// }

// export async function fetchEdificacao(
//     edificacaoUrl: string,
// ): Promise<Edificacao> {
//     const edificacao = await fetchJSON(edificacaoUrl);
//     return edificacao;
// }

// export function useSequencia(id_sequencia: number) {
//     const [values, setValues] = useState<Sequencia | null>(null);

//     useEffect(() => {
//         fetchJSON(API_BASE_URL + '/api/v1/sequencias/' + id_sequencia)
//             .then((sequencia: Sequencia) => {
//                 setValues(sequencia);
//             });
//     }, []);

//     return values;
// }

// export function useSequencias() {
//     const [sequencias, setSequencias] = useState<Sequencia[]>([]);

//     useEffect(() => {
//         fetch(API_BASE_URL + "/api/v1/sequencias/?limit=100&offset=0")
//             .then((resp) => resp.json())
//             .then((data) => {
//                 setSequencias(
//                     data.items.filter((item: any) => item.ponto_url !== null),
//                 );
//             });
//     }, []);

//     return sequencias;
// }

// export function usePontos(api_url: string = '') {
//     if (!api_url) {
//         api_url = `${API_BASE_URL}/api/v1/pontos`;
//     } else {
//         api_url = `${API_BASE_URL}${api_url}`;
//     }

//     const [pontos, setPontos] = useState<Ponto[]>([]);

//     useEffect(() => {
//         fetchJSON(api_url)
//             .then(data => {
//                 let items = data.items;
//                 setPontos(items);
//             });
//     }, [api_url]);

//     return pontos;
// }

// export function useEdificacoes(api_url: string = '') {
//     const [edificacoes, setEdificacoes] = useState<Edificacao[]>([]);

//     useEffect(() => {
//         fetch(API_BASE_URL + '/api/v1/edificacoes')
//             .then((resp) => resp.json())
//             .then((data) => setEdificacoes(data.items));
//     }, []);

//     return edificacoes;
// }

// export function useEdificacao(codigo_edificacao: string) {
//     const [edificacao, setEdificacao] = useState<Edificacao | null>(null);
//     const [loaded, setLoaded] = useState<boolean>(false);

//     useEffect(() => {
//         fetchJSON(`${API_BASE_URL}/api/v1/edificacoes/${codigo_edificacao}`)
//             .then(data => {
//                 setEdificacao(data);
//                 setLoaded(true);
//             })

//     }, []);

//     return { edificacao, loaded };
// }

// export function usePonto(id_ponto: string) {
//     const [ponto, setPonto] = useState<Ponto | null>(null);
//     const [loaded, setLoaded] = useState<boolean>(false);

//     useEffect(() => {
//         fetchJSON(`${API_BASE_URL}/api/v1/pontos/${id_ponto}`)
//             .then(data => {
//                 setPonto(data);
//                 setLoaded(true);
//             })
//     }, [id_ponto]);

//     return { ponto, loaded };
// }

// export function useColetas(id_sequencia: number | null = null, query: string | null = null) {
//     const [coletas, setColetas] = useState<Coleta[]>([]);
    
//     useEffect(() => {
//         let endpoint = id_sequencia 
//             ?`/api/v1/sequencias/${id_sequencia}/coletas`
//             : '/api/v1/coletas';
        
//         if (query != null) {
//             endpoint += '?' + query;
//         }
        
//         fetchJSON(API_BASE_URL + endpoint)
//             .then(data => {
//                 setColetas(data);
//             })
//     }, [id_sequencia, query]);

//     return coletas;
// }