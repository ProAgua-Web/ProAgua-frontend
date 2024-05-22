
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
    imagem?: string;
};

export type Sequencia = {
    id: number;
    amostragem: number;
    ponto_url: string;
    ponto?: Ponto;
    status: boolean;
    ultima_coleta?: string;
    coletas: Coleta[];
};

export type Edificacao = {
    codigo: string;
    nome: string;
    campus: string;
    cronograma: number;
    imagem?: string;
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

export const TIPOS_PONTOS = [
    null,
    "Bebedouro",
    "RPS (Reservatório predial superior)",
    "RPI (Reservatório predial inferior)",
    "RDS (Reservatório de distribuição superior)",
    "RDI (Reservatório de distribuição inferior)",
    "CAERN"
];

export type Image = {
    file: File | string,
    description: string
};