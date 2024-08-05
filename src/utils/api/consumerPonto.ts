import { PontoIn, Ponto } from "../types";
import { APIConsumer } from "./APIConsumer";
import { apiUrl } from "./APIConsumer";


export const consumerPonto = new APIConsumer<PontoIn, Ponto>(`${apiUrl}/api/v1/pontos/`);
