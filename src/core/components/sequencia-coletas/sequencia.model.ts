import { type PontoColetaDto } from '../ponto/ponto.model';

export interface SequenciaDto {
  id: number;
  amostragem?: number;
  ponto?: PontoColetaDto;
  quantidade_coletas?: number;
  status?: boolean;
  status_message?: string;
  ultima_coleta?: Date;
}

export interface CriarSequenciaDto {
  amostragem: number;
  ponto: number;
}

export interface EditarSequenciaDto extends CriarSequenciaDto {
  id: number;
}
