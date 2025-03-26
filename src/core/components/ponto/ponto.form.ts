import { fileDescriptionSchema, imageSchema } from '@/core/common/file';
import { z } from 'zod';

export const pontoSchema = z.object({
  id: z.number().nullish(),
  edificacao: z.string({ message: 'Informe a edificação' }).min(1, {
    message: 'Informe a edificação',
  }),
  tipo: z.number({ message: 'Informe o tipo' }),
  localizacao: z.string(),
  amontante: z.number().nullish(),
  tombo: z.string().nullish(),
  quantidade: z.number().nullish(),
  capacidade: z.number().nullish(),
  observacao: z.string().nullish(),
  material: z.string().nullish(),
  fonte_informacao: z.string().nullish(),
  informacoes_gerais: z.string().nullish(),
  imagens: z.union([z.array(imageSchema), z.array(fileDescriptionSchema)]),
});

export type PontoSchema = z.infer<typeof pontoSchema>;
