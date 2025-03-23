import { z } from 'zod';

export const sequenciaSchema = z.object({
  id: z.number().nullish(),
  amostragem: z.number({ message: 'Informe a amostragem' }),
  ponto: z.number({ message: 'Informe o ponto' }),
});

export type SequenciaSchema = z.infer<typeof sequenciaSchema>;
