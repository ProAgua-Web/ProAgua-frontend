import { SequenciaIn, Sequencia } from "../types";
import { APIConsumer } from "./APIConsumer";
import { apiUrl } from "./client_side_consumer";


export const consumerSequencia = new APIConsumer<SequenciaIn, Sequencia>(`${apiUrl}/api/v1/sequencias/`);
