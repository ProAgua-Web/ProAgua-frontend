'use client';

import { fileDescriptionSchema, imageSchema } from '@/core/common/file';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { solicitacaoDtoToSchema } from './solicitacao.mapper';
import { type SolicitacaoDto } from './solicitacao.model';
import { StatusSolicitacao, TipoSolicitacao } from './solicitacao.utils';

export const solicitacaoSchema = z.object({
  id: z.number().nullish(),
  edificacao: z
    .string({ message: 'Edificação é obrigatória' })
    .min(1, { message: 'Edificação é obrigatória' }),
  ponto_id: z
    .number({ message: 'Ponto é obrigatório' })
    .positive({ message: 'Ponto é obrigatório' }),
  tipo: z.nativeEnum(TipoSolicitacao, {
    message: 'Tipo de solicitação inválido',
  }),
  objetivo: z
    .string({ message: 'Objetivo é obrigatório' })
    .min(1, { message: 'Objetivo é obrigatório' }),
  justificativa: z
    .string({ message: 'Justificativa é obrigatória' })
    .min(1, { message: 'Justificativa é obrigatória' }),
  status: z.nativeEnum(StatusSolicitacao, {
    message: 'Status de solicitação inválido',
  }),
  imagens: z.array(z.union([imageSchema, fileDescriptionSchema])).default([]),
});

export type SolicitacaoSchema = z.infer<typeof solicitacaoSchema>;

export const useSolicitacaoForm = (dto?: SolicitacaoDto) => {
  const form = useForm<SolicitacaoSchema>({
    resolver: zodResolver(solicitacaoSchema),
    defaultValues: dto ? solicitacaoDtoToSchema(dto) : undefined,
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (dto) {
      form.reset(solicitacaoDtoToSchema(dto));
    }
  }, [dto, form]);

  return form;
};
