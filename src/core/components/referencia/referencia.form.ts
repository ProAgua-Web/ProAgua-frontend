import { ReferenciaDto } from '@/core/components/referencia/referencia.model';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { referenciaDtoToSchema } from './referencia.mapper';

export const referenciaSchema = z.object({
  min_temperatura: z
    .string({ message: 'Informe a temperatura mínima' })
    .default('0'),
  max_temperatura: z
    .string({ message: 'Informe a temperatura máxima' })
    .default('0'),
  min_cloro_residual_livre: z
    .string({ message: 'Informe o cloro residual livre mínimo' })
    .default('0'),
  max_cloro_residual_livre: z
    .string({ message: 'Informe o cloro residual livre máximo' })
    .default('0'),
  min_turbidez: z.string({ message: 'Informe a turbidez mínima' }).default('0'),
  max_turbidez: z.string({ message: 'Informe a turbidez máxima' }).default('0'),
  min_cor: z.string({ message: 'Informe a cor mínima' }).default('0'),
  max_cor: z.string({ message: 'Informe a cor máxima' }).default('0'),
  coliformes_totais: z.boolean().default(false),
  escherichia: z.boolean().default(false),
});

export type ReferenciaSchema = z.infer<typeof referenciaSchema>;

export const useReferenciaForm = (dto?: ReferenciaDto) => {
  const form = useForm<ReferenciaSchema>({
    resolver: zodResolver(referenciaSchema),
    defaultValues: dto ? referenciaDtoToSchema(dto) : undefined,
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (dto) {
      form.reset(referenciaDtoToSchema(dto));
    }
  }, [dto, form]);

  return form;
};
