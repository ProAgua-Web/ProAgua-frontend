export type PontoIn = {
  codigo_edificacao?: string;
  localizacao: string | null;
  tipo: number | null;
  amontante: number | null;
  tombo: string | null;

  quantidade?: number | null;
  capacidade?: number | null;
  material?: string | null;
  fonte_informacao?: string | null;
  observacao?: string | null;

  // imagem: string | null,
};

export type PontoInicialIn = {
  codigo_edificacao: string;
  tipo: number;
  localizacao: string | null;
  tombo: string | null;
  // imagem: string | null,
  amontante: number | null;
};

export type ReservatorioIn = {
  codigo_edificacao: string;
  tipo: number;
  localizacao: string | null;
  quantidade: number | null; // unico, duplo, triplo
  capacidade: number | null; // em (L)
  material: string | null; // polietileno, alvenaria, fibra de vidro
  fonte_informacao: string | null; // Técnico reponsável
  observacao: string | null;
  // imagem: string,
  amontante: number | null;
};

export type Ponto = {
  id: number;
  edificacao: Edificacao;
  tipo: number;
  localizacao?: string | null;
  observacao?: string | null;
  tombo?: string | null;

  quantidade?: number | null;
  capacidade?: number | null;
  material?: string | null;
  fonte_informacao?: string | null;

  status: boolean;
  status_message: string;
  amontante?: Ponto;
  imagens: ImageOut[];
};

export type Reservatorio = {
  id: number;
  edificacao: Edificacao;
  tipo: number;
  localizacao: string;
  quantidade: number;
  capacidade: number;
  material: string;
  status: boolean;
  status_message: string;
  amontante?: Ponto;
  imagens: ImageOut[];
};

export type SequenciaIn = {
  amostragem: number;
  ponto: number;
};

export type Sequencia = {
  id: number;
  amostragem: number;
  ponto_url: string;
  ponto?: Ponto;
  status: boolean;
  status_message: string;
  ultima_coleta?: string;
  quantidade_coletas: number;
};

export type Edificacao = {
  codigo: string;
  nome: string;
  campus: string;
  cronograma: number;
  imagens: ImageOut[];
  pontos_url: string;
  informacoes_gerais?: string;
};

export type EdificacaoIn = {
  codigo: string;
  nome: string;
  campus: string;
  cronograma: number;
  informacoes_gerais?: string;
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
  status: boolean;
  status_messages: string[];
  ponto: Ponto;
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
  coliformes_totais: boolean;
  escherichia: boolean;
};

export type UsuarioIn = {
  username: string;
  first_name: string;
  last_name: string;
  password: string;
  email: string;
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
  password: string;
};

export type SolicitacaoIn = {
  ponto_id: number;
  tipo: string;
  objetivo: string | null;
  justificativa: string | null;
  status: string;
};

export type Solicitacao = {
  id: number;
  ponto: Ponto;
  data: string;
  status: string;
  tipo: string;
  objetivo: string;
  justificativa: string;
  imagens: ImageOut[];
};

export type Image = {
  id?: number;
  file?: File | null;
  description: string;
  src?: string | null;
};

export type ImageIn = {
  file: File;
  description: string;
};

export type ImageOut = {
  id: string;
  src: string;
  description: string;
};

export const TIPOS_PONTOS = [
  'Bebedouro',
  'Torneira',
  'RPS (Reservatório predial superior)',
  'RPI (Reservatório predial inferior)',
  'RDS (Reservatório de distribuição superior)',
  'RDI (Reservatório de distribuição inferior)',
  'CAERN',
];

export const TIPOS_SOLICITACOES = [
  'LIMPEZA_RESERVATORIO',
  'INSTALACAO_PONTO',
  'CONSERTO_RESERVATORIO',
];
