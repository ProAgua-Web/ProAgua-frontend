import { type SequenciaSchema } from './sequencia.form';
import { type CreateSequenciaDto, type SequenciaDto } from './sequencia.model';

export function sequenciaSchemaToDto(
  schema: SequenciaSchema,
): CreateSequenciaDto {
  return {
    id: schema.id,
    amostragem: schema.amostragem,
    ponto: schema.ponto,
  };
}

export function sequenciaDtoToSchema(dto: SequenciaDto): SequenciaSchema {
  return {
    id: dto.id,
    amostragem: dto.amostragem!,
    edificacao: dto.ponto!.edificacao.codigo,
    ponto: dto.ponto?.id || 0,
  };
}
