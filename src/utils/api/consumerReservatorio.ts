import { Reservatorio, ReservatorioIn } from '../types';
import { APIConsumer, apiUrl } from './APIConsumer';

export const consumerReservatorio = new APIConsumer<
  ReservatorioIn,
  Reservatorio
>(`${apiUrl}/reservatorios/`);
