import { type ImagemDto } from '@/core/common/imagem/imagem.api';
import { EdificacaoDto } from '../edificacao/edificacao.model';

export interface PontoDto {
  id?: number | null;
  edificacao: EdificacaoDto;
  tipo: number;
  localizacao: string;
  amontante?: PontoDto | null;
  imagens: Array<ImagemDto>;
  tombo?: string | null;
  capacidade?: number | null;
  quantidade?: number | null;
  observacao?: string | null;
  material?: string | null;
  fonte_informacao?: string | null;
}

export interface CreatePontoDto
  extends Omit<PontoDto, 'id' | 'imagens' | 'edificacao' | 'amontante'> {
  amontante: number | null;
  codigo_edificacao: string;
  imagens: Array<File | ImagemDto>;
}

export type UpdatePontoDto = CreatePontoDto;
