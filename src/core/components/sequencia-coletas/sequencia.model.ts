import { type PontoDto } from '../ponto/ponto.model';

export interface SequenciaDto {
  id?: number | null;
  amostragem?: number;
  ponto?: PontoDto;
  quantidade_coletas?: number;
  status?: boolean;
  status_message?: string;
  ultima_coleta?: Date;
}

export interface CreateSequenciaDto {
  id?: number | null;
  amostragem: number;
  ponto: number;
}

export type UpdateSequenciaDto = CreateSequenciaDto;
