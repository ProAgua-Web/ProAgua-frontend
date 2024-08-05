import { SolicitacaoIn, Solicitacao } from "../types";
import { APIConsumer } from "./APIConsumer";
import { apiUrl } from "./client_side_consumer";


export const consumerSolicitacao = new APIConsumer<SolicitacaoIn, Solicitacao>(`${apiUrl}/api/v1/solicitacoes/`);
