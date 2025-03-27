'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { coletaDtoToSchema } from './coleta.mapper';
import { type ColetaDto } from './coleta.model';

export const coletaSchema = z.object({
  id: z.number().nullish(),
  sequencia_id: z.number({ message: 'Sequência é obrigatória' }),
  edificacao: z.string({ message: 'Edificação é obrigatória' }).min(1, {
    message: 'Edificação é obrigatória',
  }),
  pontoId: z.number({ message: 'Ponto é obrigatório' }),
  temperatura: z.string({ message: 'Temperatura é obrigatória' }).min(1, {
    message: 'Temperatura é obrigatória',
  }),
  cloro_residual_livre: z
    .string({
      message: 'Cloro residual livre é obrigatório',
    })
    .min(1, { message: 'Cloro residual livre é obrigatório' }),
  turbidez: z.string({ message: 'Turbidez é obrigatória' }).min(1, {
    message: 'Turbidez é obrigatória',
  }),
  cor: z.string({ message: 'Cor é obrigatória' }).min(1, {
    message: 'Cor é obrigatória',
  }),
  coliformes_totais: z.boolean().default(false),
  escherichia: z.boolean().default(false),
  data: z.date({ message: 'Data é obrigatória' }),
  responsaveis_id: z
    .array(z.number(), { message: 'Responsáveis é obrigatório' })
    .nonempty({ message: 'Responsáveis é obrigatório' })
    .min(1, { message: 'Responsáveis é obrigatório' }),
  ordem: z.number({ message: 'Ordem é obrigatória' }),
});

export type ColetaSchema = z.infer<typeof coletaSchema>;

export const useColetaForm = (dto?: ColetaDto) => {
  const form = useForm<ColetaSchema>({
    resolver: zodResolver(coletaSchema),
    defaultValues: dto ? coletaDtoToSchema(dto) : undefined,
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (dto) {
      form.reset(coletaDtoToSchema(dto));
    }
  }, [dto, form]);

  return form;
};
