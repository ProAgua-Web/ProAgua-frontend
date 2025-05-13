import { BooleanOptional } from '@/core/common/utils';
import { z } from 'zod';

export const filterSchema = z.object({
  ponto_id: z.union([z.number(), z.nan()]).optional(),
  sequencia_id: z.union([z.number(), z.nan()]).optional(),
  responsavel: z.string().nullish(),
  data_minima: z.date().nullish(),
  data_maxima: z.date().nullish(),
  temperatura_minima: z.union([z.number(), z.nan()]).optional(),
  temperatura_maxima: z.union([z.number(), z.nan()]).optional(),
  cloro_residual_livre_minimo: z.union([z.number(), z.nan()]).optional(),
  cloro_residual_livre_maximo: z.union([z.number(), z.nan()]).optional(),
  turbidez_minima: z.union([z.number(), z.nan()]).optional(),
  turbidez_maxima: z.union([z.number(), z.nan()]).optional(),
  coliformes_totais: z.nativeEnum(BooleanOptional).default('all'),
  escherichia: z.nativeEnum(BooleanOptional).default('all'),
  cor_minima: z.union([z.number(), z.nan()]).optional(),
  cor_maxima: z.union([z.number(), z.nan()]).optional(),
  ordem: z.number().nullish(),
  codigo_edificacao: z.string().nullish(),
});

export type FilterSchema = z.infer<typeof filterSchema>;
