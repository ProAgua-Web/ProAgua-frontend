import { ReservatorioIn, Reservatorio } from "../types";
import { APIConsumer } from "./APIConsumer";
import { apiUrl } from "./client_side_consumer";


export const consumerReservatorio = new APIConsumer<ReservatorioIn, Reservatorio>(`${apiUrl}/api/v1/reservatorios/`);
