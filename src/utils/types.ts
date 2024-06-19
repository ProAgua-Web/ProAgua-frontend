
export type PontoIn = {
    tombo?: string,
    ambiente?: string,
    tipo?: number,
    codigo_edificacao?: string,
    amontante?: string,
    imagem?: string,
    associados?: number[],
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
    amontante?: Ponto;
    associados: number[];
    imagem?: string;
};

export type SequenciaIn = {
    amostragem: number,
    ponto: number
};

export type Sequencia = {
    id: number;
    amostragem: number;
    ponto_url: string;
    ponto?: Ponto;
    status: boolean;
    status_message: string;
    ultima_coleta?: string;
    coletas: Coleta[];
};

export type Edificacao = {
    codigo: string;
    nome: string;
    campus: string;
    cronograma: number;
    imagens: Image[];
    pontos_url: string;
};

export type EdificacaoIn = {
    codigo: string;
    nome: string;
    campus: string;
    cronograma: number;
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
    status: boolean,
    status_messages: string[],
    ponto: Ponto,
    responsaveis_id: number[];
    responsaveis_url: string;
    sequencia_id: number;
    sequencia_url: string;
    ponto_url: string;
};

export type ColetaIn = {
    ponto_id: number;
    temperatura: number;
    cloro_residual_livre: number;
    turbidez: number;
    coliformes_totais: boolean;
    escherichia: boolean;
    cor: number;
    data: string;
    ordem: string;
    responsavel: number[];
    sequencia_id: number;
};

export type ParametroReferencia = {
    min_temperatura: number;
    max_temperatura: number;
    min_cloro_residual_livre: number;
    max_cloro_residual_livre: number;
    min_turbidez: number;
    max_turbidez: number;
    min_cor: number;
    max_cor: number;
    coliformes_totais: boolean;
    coliformes_fecais: boolean;
}

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
    password: string;
}

export type Solicitacao = {
    id: number;
    ponto: Ponto;
    data: string;
    status: string;
    tipo: string;
    objetivo: string;
    justificativa: string;
    imagens: ImageOut[];
}

export type Image = {
    id?: number,
    file?: File | null,
    description: string,
    src?: string | null
};

export type ImageIn = {
    file: File,
    description: string
};

export type ImageOut = {
    id: number,
    src: string,
    description: string
};

export const TIPOS_PONTOS = [
    null,
    "Bebedouro",
    "RPS (Reservatório predial superior)",
    "RPI (Reservatório predial inferior)",
    "RDS (Reservatório de distribuição superior)",
    "RDI (Reservatório de distribuição inferior)",
    "CAERN"
];

export const TIPOS_SOLICITACOES = [
    "LIMPEZA_RESERVATORIO",
    "INSTALACAO_PONTO",
    "CONSERTO_RESERVATORIO"
];