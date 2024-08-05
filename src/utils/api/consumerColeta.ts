import { ColetaIn, Coleta } from "../types";
import { APIConsumer } from "./APIConsumer";
import { apiUrl } from "./client_side_consumer";


export const consumerColeta = new APIConsumer<ColetaIn, Coleta>(`${apiUrl}/api/v1/coletas/`);
