import { ParametroReferencia } from "../types";
import { APIConsumer } from "./APIConsumer";
import { apiUrl } from "./client_side_consumer";


export const consumerParametrosReferencia = new APIConsumer<ParametroReferencia, ParametroReferencia>(`${apiUrl}/api/v1/parametros_referencia/`);
