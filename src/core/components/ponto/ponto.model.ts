import { type Campus } from '@/lib/utils';

export interface PontoColetaDto {
  id: number;
  edificacao: {
    codigo: string;
    nome: string;
    campus: Campus;
    cronograma: number;
    imagens: {
      id: string;
      src: string;
      description: string;
    }[];
    informacoes_gerais: string;
  };
  tipo: number;
  localizacao: string;
  amontante: string;
  imagens: {
    id: string;
    src: string;
    description: string;
  }[];
  tombo: string;
  quantidade: number;
  capacidade: number;
  observacao: string;
  material: string;
  fonte_informacao: string;
}
