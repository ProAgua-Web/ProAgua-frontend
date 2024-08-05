import { PontoIn, Ponto } from "../types";
import { APIConsumer } from "./APIConsumer";
import { apiUrl } from "./client_side_consumer";


export const consumerPonto = new APIConsumer<PontoIn, Ponto>(`${apiUrl}/api/v1/pontos/`);
