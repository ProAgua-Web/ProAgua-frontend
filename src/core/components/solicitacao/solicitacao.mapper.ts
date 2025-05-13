import { type SolicitacaoSchema } from './solicitacao.form';
import {
  type CreateSolicitacaoDto,
  type SolicitacaoDto,
} from './solicitacao.model';

export function solicitacaoSchemaToDto(
  schema: SolicitacaoSchema,
): CreateSolicitacaoDto {
  return {
    ponto_id: schema.ponto_id,
    tipo: schema.tipo,
    objetivo: schema.objetivo,
    justificativa: schema.justificativa,
    status: schema.status,
    imagens: schema.imagens,
  };
}

export function solicitacaoDtoToSchema(dto: SolicitacaoDto): SolicitacaoSchema {
  return {
    id: dto.id,
    edificacao: dto.ponto?.edificacao.codigo || '',
    ponto_id: dto.ponto?.id ?? 0,
    tipo: dto.tipo,
    objetivo: dto.objetivo,
    justificativa: dto.justificativa,
    status: dto.status,
    imagens: dto.imagens,
  };
}
