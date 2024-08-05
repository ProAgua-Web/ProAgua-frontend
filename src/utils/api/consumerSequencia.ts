import { SequenciaIn, Sequencia } from "../types";
import { APIConsumer } from "./APIConsumer";
import { apiUrl } from "./APIConsumer";


export const consumerSequencia = new APIConsumer<SequenciaIn, Sequencia>(`${apiUrl}/api/v1/sequencias/`);
