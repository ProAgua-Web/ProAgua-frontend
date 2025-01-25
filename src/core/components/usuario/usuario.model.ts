import { type NivelUsuario } from './usuario.utils';

export interface Usuario {
  id: number;
  nome: string;
  nivel: NivelUsuario;
  email: string;
  whatsapp: string;
  alterarSenha: boolean;
}
