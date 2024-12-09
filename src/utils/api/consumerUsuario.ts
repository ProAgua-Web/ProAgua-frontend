import { Usuario, UsuarioIn } from '../types';
import { APIConsumer, apiUrl } from './APIConsumer';

export const consumerUsuario = new APIConsumer<UsuarioIn, Usuario>(
  `${apiUrl}/usuarios/`,
);
