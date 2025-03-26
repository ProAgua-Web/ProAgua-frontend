import { type PontoSchema } from './ponto.form';
import { type CreatePontoDto, type PontoDto } from './ponto.model';

export function pontoSchemaToDto({ ...ponto }: PontoSchema): CreatePontoDto {
  return {
    ...ponto,
  };
}

export function pontoDtoToSchema(ponto: PontoDto): PontoSchema {
  return {
    ...ponto,
    edificacao: ponto.edificacao.codigo,
  };
}
