import { ReferenciaDto } from '@/core/components/referencia/referencia.model';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { referenciaDtoToSchema } from './referencia.mapper';

export const referenciaSchema = z.object({
  min_temperatura: z
    .string({ message: 'Informe a temperatura mínima' })
    .nullish(),
  max_temperatura: z
    .string({ message: 'Informe a temperatura máxima' })
    .nullish(),
  min_cloro_residual_livre: z
    .string({ message: 'Informe o cloro residual livre mínimo' })
    .nullish(),
  max_cloro_residual_livre: z
    .string({ message: 'Informe o cloro residual livre máximo' })
    .nullish(),
  min_turbidez: z.string({ message: 'Informe a turbidez mínima' }).nullish(),
  max_turbidez: z.string({ message: 'Informe a turbidez máxima' }).nullish(),
  min_cor: z.string({ message: 'Informe a cor mínima' }).nullish(),
  max_cor: z.string({ message: 'Informe a cor máxima' }).nullish(),
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
