
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