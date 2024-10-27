import { UsuarioIn, Usuario } from '../types';
import { APIConsumer } from './APIConsumer';
import { apiUrl } from './APIConsumer';

export const consumerUsuario = new APIConsumer<UsuarioIn, Usuario>(
  `${apiUrl}/api/v1/usuarios/`,
);
