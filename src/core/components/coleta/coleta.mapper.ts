import { floatToString, stringToFloat } from '@/lib/utils';
import { type ColetaSchema } from './coleta.form';
import { type ColetaDto, type CreateColetaDto } from './coleta.model';

export function coletaSchemaToDto(schema: ColetaSchema): CreateColetaDto {
  return {
    sequencia_id: schema.sequencia_id,
    temperatura: stringToFloat(schema.temperatura),
    cloro_residual_livre: stringToFloat(schema.cloro_residual_livre),
    turbidez: stringToFloat(schema.turbidez),
    coliformes_totais: schema.coliformes_totais,
    escherichia: schema.escherichia,
    cor: stringToFloat(schema.cor),
    data: schema.data.toISOString(),
    ordem: schema.ordem,
    ponto_id: schema.pontoId,
    responsavel: schema.responsaveis_id,
    publico: schema.publico,
  };
}

export function coletaDtoToSchema(dto: ColetaDto): ColetaSchema {
  return {
    id: dto.id,
    edificacao: dto.ponto.edificacao.codigo,
    sequencia_id: dto.sequencia_id,
    temperatura: floatToString(dto.temperatura),
    cloro_residual_livre: floatToString(dto.cloro_residual_livre),
    turbidez: floatToString(dto.turbidez),
    coliformes_totais: dto.coliformes_totais,
    escherichia: dto.escherichia,
    cor: floatToString(dto.cor),
    data: new Date(dto.data),
    ordem: dto.ordem,
    pontoId: dto.ponto.id!,
    responsaveis_id: [dto.responsaveis_id[0], ...dto.responsaveis_id.slice(1)], // [number, ...number[]]
    publico: dto.publico,
  };
}
