import { type CreateEdificacaoDTO } from './edificacao.api';
import { type EdificacaoSchema } from './edificacao.form';
import { type Edificacao } from './edificacao.model';

export function edificacaoSchemaToDto({
  imagens,
  ...edificacao
}: EdificacaoSchema): CreateEdificacaoDTO {
  return {
    imagens: imagens,
    ...edificacao,
    // endereco: enderecoSchemaToDto(endereco),
  };
}

export function edificacaoToSchema(edificacao: Edificacao): EdificacaoSchema {
  return {
    ...edificacao,
    imagens: [],
    // endereco: enderecoToSchema(edificacao.endereco),
  };
}
