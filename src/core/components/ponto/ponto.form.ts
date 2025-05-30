'use client';

import { fileDescriptionSchema, imageSchema } from '@/core/common/file';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { pontoDtoToSchema } from './ponto.mapper';
import { type PontoDto } from './ponto.model';

export const pontoSchema = z.object({
  id: z.number().nullish(),
  codigo_edificacao: z.string({ message: 'Informe a edificação' }).min(1, {
    message: 'Informe a edificação',
  }),
  tipo: z.number({ message: 'Informe o tipo' }),
  localizacao: z.string({ message: 'Informe a localização' }).min(1, {
    message: 'Informe a localização',
  }),
  amontante_codigo_edificacao: z.string().nullish(),
  amontante_id: z.number().nullish(),
  tombo: z.string().nullish(),
  observacao: z.string().nullish(),
  material: z.string().nullish(),
  imagens: z.array(z.union([imageSchema, fileDescriptionSchema])).default([]),
  quantidade: z.number().nullish(),
  capacidade: z.string().nullish(),
  fonte_informacao: z.string().nullish(),
});

export type PontoSchema = z.infer<typeof pontoSchema>;

export const usePontoForm = (dto?: PontoDto) => {
  const form = useForm<PontoSchema>({
    resolver: zodResolver(pontoSchema),
    defaultValues: dto ? pontoDtoToSchema(dto) : undefined,
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (dto) {
      form.reset(pontoDtoToSchema(dto));
    }
  }, [dto, form]);

  return form;
};
