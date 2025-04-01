import { type ImagemDto } from '@/core/common/imagem/imagem.api';
import { type Campus } from '@/lib/utils';

export interface PontoDto {
  id?: number | null;
  edificacao: {
    codigo: string;
    nome: string;
    campus: Campus;
    cronograma: number;
    imagens: Array<ImagemDto>;
    informacoes_gerais: string;
  };
  tipo: number;
  localizacao: string;
  amontante?: number | null;
  imagens: Array<ImagemDto>;
  tombo?: string | null;
  capacidade?: number | null;
  quantidade?: number | null;
  observacao?: string | null;
  material?: string | null;
  fonte_informacao?: string | null;
}

export interface CreatePontoDto
  extends Omit<PontoDto, 'id' | 'imagens' | 'edificacao'> {
  codigo_edificacao: string;
  imagens: Array<File | ImagemDto>;
}

export type UpdatePontoDto = CreatePontoDto;
