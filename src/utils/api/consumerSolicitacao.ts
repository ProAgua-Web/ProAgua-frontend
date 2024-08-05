import { SolicitacaoIn, Solicitacao } from "../types";
import { APIConsumer } from "./APIConsumer";
import { apiUrl } from "./APIConsumer";


export const consumerSolicitacao = new APIConsumer<SolicitacaoIn, Solicitacao>(`${apiUrl}/api/v1/solicitacoes/`);
