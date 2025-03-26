import { type EdificacaoSchema } from './edificacao.form';
import { type EdificacaoDto } from './edificacao.model';

export function edificacaoSchemaToDto({
  ...schema
}: EdificacaoSchema): EdificacaoSchema {
  return {
    ...schema,
  };
}

export function edificacaoDtoToSchema(dto: EdificacaoDto): EdificacaoSchema {
  return {
    ...dto,
  };
}
