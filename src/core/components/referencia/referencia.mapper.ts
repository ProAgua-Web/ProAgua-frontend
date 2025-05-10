import { floatToString, stringToFloat } from '@/lib/utils';
import { ReferenciaSchema } from './referencia.form';
import { ReferenciaDto } from './referencia.model';

export const referenciaSchemaToDto = (
  schema: ReferenciaSchema,
): ReferenciaDto => {
  return {
    min_temperatura:
      schema.min_temperatura != null
        ? stringToFloat(schema.min_temperatura)
        : null,
    max_temperatura:
      schema.max_temperatura != null
        ? stringToFloat(schema.max_temperatura)
        : null,
    min_cloro_residual_livre:
      schema.min_cloro_residual_livre != null
        ? stringToFloat(schema.min_cloro_residual_livre)
        : null,
    max_cloro_residual_livre:
      schema.max_cloro_residual_livre != null
        ? stringToFloat(schema.max_cloro_residual_livre)
        : null,
    min_turbidez:
      schema.min_turbidez != null ? stringToFloat(schema.min_turbidez) : null,
    max_turbidez:
      schema.max_turbidez != null ? stringToFloat(schema.max_turbidez) : null,
    min_cor: schema.min_cor != null ? stringToFloat(schema.min_cor) : null,
    max_cor: schema.max_cor != null ? stringToFloat(schema.max_cor) : null,
    coliformes_totais: schema.coliformes_totais,
    escherichia: schema.escherichia,
  };
};

export const referenciaDtoToSchema = (dto: ReferenciaDto): ReferenciaSchema => {
  return {
    min_temperatura:
      dto.min_temperatura != null ? floatToString(dto.min_temperatura) : null,
    max_temperatura:
      dto.max_temperatura != null ? floatToString(dto.max_temperatura) : null,
    min_cloro_residual_livre:
      dto.min_cloro_residual_livre != null
        ? floatToString(dto.min_cloro_residual_livre)
        : null,
    max_cloro_residual_livre:
      dto.max_cloro_residual_livre != null
        ? floatToString(dto.max_cloro_residual_livre)
        : null,
    min_turbidez:
      dto.min_turbidez != null ? floatToString(dto.min_turbidez) : null,
    max_turbidez:
      dto.max_turbidez != null ? floatToString(dto.max_turbidez) : null,
    min_cor: dto.min_cor != null ? floatToString(dto.min_cor) : null,
    max_cor: dto.max_cor != null ? floatToString(dto.max_cor) : null,
    coliformes_totais: dto.coliformes_totais,
    escherichia: dto.escherichia,
  };
};
