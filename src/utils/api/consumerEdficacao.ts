import { EdificacaoIn, Edificacao } from "../types";
import { APIConsumer } from "./APIConsumer";
import { apiUrl } from "./client_side_consumer";


export const consumerEdficacao = new APIConsumer<EdificacaoIn, Edificacao>(`${apiUrl}/api/v1/edificacoes/`);
