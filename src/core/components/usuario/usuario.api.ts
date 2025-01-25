import { type UnidadeDTO } from '@/core/components/unidade/unidade.api';
import { api, type ApiResponse } from '@/lib/api';
import { type NivelUsuario } from './usuario.utils';

export interface CreateUsuarioDTO {
  nome: string;
  nivel: NivelUsuario;
  email: string;
  whatsapp: string;
  unidades: number[]; // UnidadeDTO
}

export interface UpdateUsuarioDTO {
  nome: string;
  nivel: NivelUsuario;
  email: string;
  whatsapp: string;
  unidades: number[]; // UnidadeDTO
}

export interface UsuarioDTO {
  id: number;
  nome: string;
  nivel: NivelUsuario;
  email: string;
  whatsapp: string;
  unidades: UnidadeDTO[];
  alterarSenha: boolean;
}

export async function listUsuarios() {
  const response = await api.get<ApiResponse<UsuarioDTO[]>>('/users');
  return response.data;
}

export async function getUsuario(id: number) {
  const response = await api.get<ApiResponse<UsuarioDTO>>(`/users/${id}`);
  return response.data;
}

export async function getUsuarioByUsername(username: string) {
  const response = await api.get<ApiResponse<UsuarioDTO>>(
    `/users/search/login`,
    { params: { login: username } },
  );
  return response.data;
}

export async function createUsuario(usuario: CreateUsuarioDTO) {
  await api.post('/users', usuario);
}

export async function updateUsuario(id: number, usuario: UpdateUsuarioDTO) {
  await api.put(`/users/${id}`, usuario);
}

export async function deleteUsuario(id: number) {
  await api.delete(`/users/${id}`);
}
