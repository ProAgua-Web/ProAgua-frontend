import { type PontoSchema } from './ponto.form';
import { type CreatePontoDto, type PontoDto } from './ponto.model';

export function pontoSchemaToDto(schema: PontoSchema): CreatePontoDto {
  return {
    edificacao_codigo: schema.codigo_edificacao,
    tipo: schema.tipo,
    localizacao: schema.localizacao,
    amontante: schema.amontante,
    tombo: schema.tipo === 1 ? schema.tombo : null,
    observacao: schema.observacao,
    material: schema.material,
    imagens: schema.imagens,
  };
}

export function pontoDtoToSchema(dto: PontoDto): PontoSchema {
  return {
    id: dto.id,
    codigo_edificacao: dto.edificacao.codigo,
    tipo: dto.tipo,
    localizacao: dto.localizacao,
    amontante: dto.amontante,
    tombo: dto.tombo,
    observacao: dto.observacao,
    material: dto.material,
    imagens: dto.imagens,
  };
}
