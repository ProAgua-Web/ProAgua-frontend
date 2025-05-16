import { type PontoDto } from '../ponto/ponto.model';

export interface ColetaDto {
  id?: number | null;
  temperatura: number;
  cloro_residual_livre: number;
  turbidez: number;
  coliformes_totais: boolean;
  escherichia: boolean;
  cor: number;
  data: string;
  responsaveis_id: Array<number>;
  ordem: number;
  sequencia_id: number;
  ponto: PontoDto;
  status: boolean;
  publico: boolean;
}

export interface CreateColetaDto
  extends Omit<ColetaDto, 'ponto' | 'responsaveis_id' | 'status'> {
  ponto_id: number;
  responsavel: Array<number>;
}

export type UpdateColetaDto = CreateColetaDto;
