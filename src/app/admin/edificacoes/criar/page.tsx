'use client';

import { ControlledNumberInput } from '@/components/form/input/number-input';
import { ControlledSelect } from '@/components/form/input/select';
import { ControlledTextInput } from '@/components/form/input/text-input';
import MultipleImageInput from '@/components/MultipleImageInput';
import { Button } from '@/components/ui/button';
import { Campus, campusOptions } from '@/lib/utils';
import { createEdificacao } from '@/services/api/edificacao-service';
import { ImageType } from '@/types/Image';
import { EdificacaoIn } from '@/utils/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  codigo: z
    .string({ message: 'Código é obrigatório' })
    .min(1, { message: 'Código é obrigatório' })
    .max(20, { message: 'Código muito grande' }),
  nome: z
    .string({ message: 'Nome é obrigatório' })
    .min(1, { message: 'Nome é obrigatório' })
    .max(80, { message: 'Nome muito grande' }),
  campus: z.nativeEnum(Campus, { message: 'Campus é obrigatório' }),
  cronograma: z
    .number({ message: 'Cronograma é obrigatório' })
    .positive({ message: 'Cronograma precisa ser positivo' }),
  informacoes_gerais: z.string().optional(),
});

type FormSchema = z.infer<typeof formSchema>;

export default function CriarEdificacao() {
  const { control, formState, handleSubmit } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const [submiting, setSubmiting] = useState<boolean>(false);
  const [images, setImages] = useState<ImageType[]>([]);

  async function submitForm(data: FormSchema) {
    setSubmiting(true);
    await createEdificacao(data as EdificacaoIn, images);
    window.location.href = '/admin/pontos';
  }

  return (
    <>
      <h1 className="mb-8 text-4xl font-bold text-neutral-700">
        Criar edificação
      </h1>

      <form
        className="flex w-full flex-col gap-4"
        onSubmit={handleSubmit(submitForm)}
        method="POST"
      >
        <ControlledTextInput
          control={control}
          name="codigo"
          label="Código"
          type="text"
        />
        <ControlledTextInput
          control={control}
          name="nome"
          label="Nome"
          type="text"
        />
        <ControlledSelect
          control={control}
          name="campus"
          label="Campus"
          options={campusOptions}
        />
        <ControlledNumberInput
          control={control}
          name="cronograma"
          label="Cronograma"
        />
        <ControlledTextInput
          control={control}
          name="informacoes_gerais"
          label="Informações gerais"
          type="text"
        />

        <hr />

        <label htmlFor="foto">Fotos:</label>
        <MultipleImageInput
          images={images}
          setImages={setImages}
          disabled={false}
        />
        <Button
          variant={'primary'}
          id="criar"
          type="submit"
          className="w-full"
          disabled={submiting}
        >
          {`${submiting ? 'Criando...' : 'Criar'}`}
        </Button>
      </form>
    </>
  );
}
