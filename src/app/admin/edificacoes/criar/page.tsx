'use client';

import { ControlledNumberInput } from '@/components/controlled-number-input';
import { ControlledSelect } from '@/components/controlled-select';
import { ControlledTextInput } from '@/components/controlled-text-input';
import MultipleImageInput from '@/components/MultipleImageInput';
import { campus, Campus, campusLabel } from '@/lib/utils';
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
          options={campus}
          getOptionValue={(camp) => camp}
          renderOption={(camp) => campusLabel[camp]}
        />
        <ControlledNumberInput
          control={control}
          name="cronograma"
          label="Cronograma"
        />
        <hr />

        <label htmlFor="foto">Fotos:</label>
        <MultipleImageInput
          images={images}
          setImages={setImages}
          disabled={false}
        />

        <div className="w-full">
          <input
            id="criar"
            type="submit"
            className="w-full rounded-lg border border-neutral-400 bg-primary-500 px-6 py-4 font-semibold text-white hover:bg-primary-600 disabled:bg-neutral-200 disabled:text-neutral-500"
            value={`${submiting ? 'Criando...' : 'Criar'}`}
            disabled={submiting}
          />
        </div>
      </form>
    </>
  );
}
