import { fileDescriptionSchema, imageSchema } from '@/core/common/file';
import { Campus } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { edificacaoDtoToSchema } from './edificacao.mapper';
import { type EdificacaoDto } from './edificacao.model';

const edificacaoSchema = z.object({
  id: z.number().nullish(),
  codigo: z.string({ message: 'Código é obrigatório' }),
  nome: z
    .string({ message: 'Nome é obrigatório' })
    .min(1, 'Nome é obrigatório'),
  campus: z.nativeEnum(Campus, { message: 'Campus é obrigatório' }),
  cronograma: z
    .number({ message: 'Cronograma é obrigatório' })
    .min(1, { message: 'O valor precisa ser entre 1 e 12' })
    .max(12, { message: 'O valor precisa ser entre 1 e 12' }),
  informacoes_gerais: z.string().nullish(),
  imagens: z.array(z.union([imageSchema, fileDescriptionSchema])).default([]),
});

export type EdificacaoSchema = z.infer<typeof edificacaoSchema>;

export const useEdificacaoForm = (dto?: EdificacaoDto) => {
  const form = useForm<EdificacaoSchema>({
    resolver: zodResolver(edificacaoSchema),
    defaultValues: dto ? edificacaoDtoToSchema(dto) : undefined,
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (dto) {
      form.reset(edificacaoDtoToSchema(dto));
    }
  }, [dto, form]);

  return form;
};
