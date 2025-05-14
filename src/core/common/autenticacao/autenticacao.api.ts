import { api, ApiResponse } from '@/lib/api';

const ENDPOINT = '/auth';

type csrfToken = { csrfToken: string };

export interface CredenciaisDTO {
  username: string;
  password: string;
}

export interface TokenDTO {
  id: number;
  username: string;
  accessToken: string;
}

export async function getCsrftoken(): Promise<csrfToken> {
  const res = await api.get<csrfToken>('/csrf');
  return res.data;
}

export async function entrar(data: CredenciaisDTO) {
  const res = await api.post<ApiResponse<TokenDTO>>(ENDPOINT + '/login', data);
  return res.data;
}

export async function sair() {
  const res = await api.get(ENDPOINT + '/logout');
  return res.data;
}

export interface PrimeiroAcessoDTO {
  password: string;
}

export async function primeiroAcesso(dados: PrimeiroAcessoDTO) {
  await api.post(ENDPOINT + '/firstAccess', dados);
}

export interface RecuperarAcessoDTO {
  email: string;
}

export async function recuperarAcesso(dados: RecuperarAcessoDTO) {
  await api.post(ENDPOINT + `/recoverAccess`, dados);
}

export interface RedefinirSenhaDTO {
  email: string;
  password: string;
  passwordConfirmation: string;
  verificationCode: string;
}

export async function redefinirSenha(dados: RedefinirSenhaDTO) {
  await api.post(ENDPOINT + '/resetPassword', dados);
}
