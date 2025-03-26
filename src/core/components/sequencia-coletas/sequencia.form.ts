'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { sequenciaDtoToSchema } from './sequencia.mapper';
import { type SequenciaDto } from './sequencia.model';

export const sequenciaSchema = z.object({
  id: z.number().nullish(),
  amostragem: z
    .number({ message: 'Amostragem é obrigatória' })
    .min(1, {
      message: 'Amostragem deve estar entre 1 e 12',
    })
    .max(12, {
      message: 'Amostragem deve estar entre 1 e 12',
    }),
  edificacao: z.string({ message: 'Edificação é obrigatória' }).min(1, {
    message: 'Edificação é obrigatória',
  }),
  ponto: z.number({ message: 'Ponto é obrigatório' }),
});

export type SequenciaSchema = z.infer<typeof sequenciaSchema>;

export const useSequenciaForm = (dto?: SequenciaDto) => {
  const form = useForm<SequenciaSchema>({
    resolver: zodResolver(sequenciaSchema),
    defaultValues: dto ? sequenciaDtoToSchema(dto) : undefined,
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (dto) {
      form.reset(sequenciaDtoToSchema(dto));
    }
  }, [dto, form]);

  return form;
};
