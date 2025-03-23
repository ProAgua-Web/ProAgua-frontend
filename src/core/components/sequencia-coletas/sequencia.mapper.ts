import { type SequenciaSchema } from './sequencia.form';
import {
  type CriarSequenciaDto,
  type EditarSequenciaDto,
} from './sequencia.model';

export const criarSequenciaDtoToSchema = (
  dto: CriarSequenciaDto,
): SequenciaSchema => ({
  amostragem: dto.amostragem,
  ponto: dto.ponto,
});

export const editarSequenciaDtoToSchema = (
  dto: EditarSequenciaDto,
): SequenciaSchema => ({
  id: dto.id,
  amostragem: dto.amostragem,
  ponto: dto.ponto,
});

export const criarSequenciaSchemaToDto = (
  schema: SequenciaSchema,
): CriarSequenciaDto => ({
  amostragem: schema.amostragem,
  ponto: schema.ponto,
});

export const editarSequenciaSchemaToDto = (
  schema: SequenciaSchema,
): EditarSequenciaDto => ({
  id: schema.id!,
  amostragem: schema.amostragem,
  ponto: schema.ponto,
});
