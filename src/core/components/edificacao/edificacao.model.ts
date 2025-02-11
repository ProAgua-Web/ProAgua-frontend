import { Imagem } from '@/core/common/imagem/imagem.model';
import { Campus } from '@/lib/utils';

export interface Edificacao {
  codigo: string;
  nome: string;
  campus: Campus;
  cronograma: number;
  imagens: Imagem[];
  pontos_url: string;
  informacoes_gerais?: string;
}
