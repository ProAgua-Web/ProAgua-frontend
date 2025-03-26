import { type ImagemDto } from '@/core/common/imagem/imagem.api';
import { type Campus } from '@/lib/utils';

export interface EdificacaoDto {
  codigo: string;
  nome: string;
  campus: Campus;
  cronograma: number;
  imagens: ImagemDto[];
  informacoes_gerais?: string | null;
  pontos_url: string;
}
export interface CreateEdificacaoDto
  extends Omit<EdificacaoDto, 'imagens' | 'pontos_url'> {
  imagens: Array<File | ImagemDto>;
}
export type UpdateEdificacaoDto = CreateEdificacaoDto;
