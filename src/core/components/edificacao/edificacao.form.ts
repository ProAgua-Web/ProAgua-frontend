import { photographySchema } from '@/core/common/imagem/imagem.model';
import { Campus } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { edificacaoToSchema } from './edificacao.mapper';
import { type Edificacao } from './edificacao.model';

export const edificacaoSchema = z.object({
  codigo: z.string({ message: 'Código é obrigatório' }),
  nome: z
    .string({ message: 'Nome é obrigatório' })
    .min(1, 'Nome é obrigatório'),
  campus: z.nativeEnum(Campus, { message: 'Campus é obrigatório' }),
  cronograma: z.number({ message: 'Cronograma é obrigatório' }),
  informacoes_gerais: z.string().nullish(),
  imagens: z.array(photographySchema).optional(),
});

export type EdificacaoSchema = z.infer<typeof edificacaoSchema>;

export const useEdificacaoForm = (edificacao?: Edificacao) => {
  const form = useForm<EdificacaoSchema>({
    resolver: zodResolver(edificacaoSchema),
    defaultValues: edificacao ? edificacaoToSchema(edificacao) : undefined,
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (edificacao) {
      form.reset(edificacaoToSchema(edificacao));
    }
  }, [edificacao, form]);

  return form;
};
