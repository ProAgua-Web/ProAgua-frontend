import { floatToString, stringToFloat } from '@/lib/utils';
import { type PontoSchema } from './ponto.form';
import { type CreatePontoDto, type PontoDto } from './ponto.model';

export function pontoSchemaToDto(schema: PontoSchema): CreatePontoDto {
  return {
    codigo_edificacao: schema.codigo_edificacao,
    tipo: schema.tipo,
    localizacao: schema.localizacao,
    amontante: schema.amontante ? schema.amontante : null,
    tombo: schema.tipo === 0 ? schema.tombo : null,
    observacao: schema.observacao,
    material: schema.material,
    imagens: schema.imagens,
    capacidade: stringToFloat(schema.capacidade ?? ''),
    quantidade: schema.quantidade,
    fonte_informacao: schema.fonte_informacao,
  };
}

export function pontoDtoToSchema(dto: PontoDto): PontoSchema {
  return {
    id: dto.id,
    codigo_edificacao: dto.edificacao.codigo,
    tipo: dto.tipo,
    localizacao: dto.localizacao,
    amontante_codigo_edificacao: dto.amontante?.edificacao.codigo,
    amontante: dto.amontante?.id,
    tombo: dto.tombo,
    observacao: dto.observacao,
    material: dto.material,
    imagens: dto.imagens,
    capacidade: floatToString(dto.capacidade ?? 0),
    quantidade: dto.quantidade,
    fonte_informacao: dto.fonte_informacao,
  };
}
