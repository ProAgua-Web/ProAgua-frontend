import { UsuarioIn, Usuario } from "../types";
import { APIConsumer } from "./APIConsumer";
import { apiUrl } from "./client_side_consumer";


export const consumerUsuario = new APIConsumer<UsuarioIn, Usuario>(`${apiUrl}/api/v1/usuarios/`);
