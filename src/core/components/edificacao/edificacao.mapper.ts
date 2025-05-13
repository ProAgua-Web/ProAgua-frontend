import { type EdificacaoSchema } from './edificacao.form';
import { CreateEdificacaoDto, type EdificacaoDto } from './edificacao.model';

export function edificacaoSchemaToDto({
  ...schema
}: EdificacaoSchema): CreateEdificacaoDto {
  return {
    ...schema,
  };
}

export function edificacaoDtoToSchema(dto: EdificacaoDto): EdificacaoSchema {
  return {
    ...dto,
  };
}
