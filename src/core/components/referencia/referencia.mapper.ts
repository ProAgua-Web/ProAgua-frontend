import { floatToString, stringToFloat } from '@/lib/utils';
import { ReferenciaSchema } from './referencia.form';
import { ReferenciaDto } from './referencia.model';

export const referenciaSchemaToDto = (
  schema: ReferenciaSchema,
): ReferenciaDto => {
  return {
    min_temperatura: stringToFloat(schema.min_temperatura),
    max_temperatura: stringToFloat(schema.max_temperatura),
    min_cloro_residual_livre: stringToFloat(schema.min_cloro_residual_livre),
    max_cloro_residual_livre: stringToFloat(schema.max_cloro_residual_livre),
    min_turbidez: stringToFloat(schema.min_turbidez),
    max_turbidez: stringToFloat(schema.max_turbidez),
    min_cor: stringToFloat(schema.min_cor),
    max_cor: stringToFloat(schema.max_cor),
    coliformes_totais: schema.coliformes_totais,
    escherichia: schema.escherichia,
  };
};

export const referenciaDtoToSchema = (dto: ReferenciaDto): ReferenciaSchema => {
  return {
    min_temperatura: floatToString(dto.min_temperatura),
    max_temperatura: floatToString(dto.max_temperatura),
    min_cloro_residual_livre: floatToString(dto.min_cloro_residual_livre),
    max_cloro_residual_livre: floatToString(dto.max_cloro_residual_livre),
    min_turbidez: floatToString(dto.min_turbidez),
    max_turbidez: floatToString(dto.max_turbidez),
    min_cor: floatToString(dto.min_cor),
    max_cor: floatToString(dto.max_cor),
    coliformes_totais: dto.coliformes_totais,
    escherichia: dto.escherichia,
  };
};
