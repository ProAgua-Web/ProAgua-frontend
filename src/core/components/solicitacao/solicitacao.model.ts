import { type ImagemDto } from '@/core/common/imagem/imagem.api';
import { type Temporal } from '@js-temporal/polyfill';
import { type PontoDto } from '../ponto/ponto.model';
import {
  type StatusSolicitacao,
  type TipoSolicitacao,
} from './solicitacao.utils';

export interface SolicitacaoDto {
  id?: number | null;
  ponto: PontoDto;
  data: Temporal.PlainDateTime;
  objetivo: string;
  justificativa: string;
  tipo: TipoSolicitacao;
  status: StatusSolicitacao;
  imagens: Array<ImagemDto>;
}

export interface CreateSolicitacaoDto
  extends Omit<SolicitacaoDto, 'id' | 'imagens' | 'ponto' | 'data'> {
  ponto_id: number;
  imagens: Array<File | ImagemDto>;
}

export type UpdateSolicitacaoDto = CreateSolicitacaoDto;
