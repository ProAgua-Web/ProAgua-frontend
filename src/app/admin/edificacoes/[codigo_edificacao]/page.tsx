'use client';

import { ControlledNumberInput } from '@/components/form/input/number-input';
import { ControlledSelect } from '@/components/form/input/select';
import { ControlledTextInput } from '@/components/form/input/text-input';
import MultipleImageInput from '@/components/MultipleImageInput';
import { Button } from '@/components/ui/button';
import { Campus, campusOptions } from '@/lib/utils';
import {
  deleteEdificacao,
  deleteImage,
  updateEdificacao,
} from '@/services/api/edificacao-service';
import { apiUrl } from '@/utils/api/APIConsumer';
import { useEdificacao } from '@/utils/api/client_side_consumer';
import { EdificacaoIn, ImageIn, ImageOut } from '@/utils/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
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
  informacoes_gerais: z.string().optional().nullable(),
});

type FormSchema = z.infer<typeof formSchema>;

export default function VisualizarEdificacao() {
  const { codigo_edificacao: codigo_edificacao } = useParams<{
    codigo_edificacao: string;
  }>();

  const { control, formState, handleSubmit, setValue, setError } =
    useForm<FormSchema>({
      resolver: zodResolver(formSchema),
      mode: 'onBlur',
      reValidateMode: 'onChange',
    });

  const edificacao = useEdificacao(codigo_edificacao);

  const [submiting, setSubmiting] = useState<boolean>(false);
  const [existingImages, setExistingImages] = useState<ImageOut[]>([]);
  const [images, setImages] = useState<ImageIn[]>([]);
  const [editable, setEditable] = useState<Boolean>(false);

  useEffect(() => {
    if (edificacao) {
      setValue('codigo', edificacao.codigo);
      setValue('nome', edificacao.nome);
      setValue('campus', edificacao.campus);
      setValue('cronograma', edificacao.cronograma);
      setValue('informacoes_gerais', edificacao.informacoes_gerais);
    }
    if (edificacao?.imagens) {
      setExistingImages(edificacao.imagens);
    }
  }, [edificacao]);

  async function removeExistingImage(url: string) {
    const image = existingImages.find((e) => apiUrl + e.src === url);

    if (image?.id) {
      await deleteImage(codigo_edificacao, image.id);
    }

    setExistingImages(
      existingImages.filter((image) => apiUrl + image.src != url),
    );
  }

  async function submitForm(data: FormSchema) {
    setSubmiting(true);
    await updateEdificacao(data as EdificacaoIn, images);
    setSubmiting(false);
  }

  function toggleEditable() {
    setEditable(!editable);
  }

  return (
    <>
      <h2 className="mb-8 text-4xl font-bold text-neutral-700">
        {editable ? 'Editar' : 'Visualizar'} edificação
      </h2>
      <form
        onSubmit={handleSubmit(submitForm)}
        onReset={() => {
          setEditable(false);
        }}
        method="PUT"
        className="flex w-full flex-col gap-4"
      >
        <ControlledTextInput
          control={control}
          name="codigo"
          label="Código"
          type="text"
          disabled={!editable}
        />
        <ControlledTextInput
          control={control}
          name="nome"
          label="Nome"
          type="text"
          disabled={!editable}
        />
        <ControlledSelect
          control={control}
          name="campus"
          label="Campus"
          options={campusOptions}
          disabled={!editable}
        />
        <ControlledNumberInput
          control={control}
          name="cronograma"
          label="Cronograma"
          disabled={!editable}
        />
        <ControlledTextInput
          control={control}
          name="informacoes_gerais"
          label="Informações gerais"
          type="text"
          disabled={!editable}
        />
        <label htmlFor="foto">Imagem:</label>
        <MultipleImageInput
          images={images}
          setImages={setImages}
          existingImages={existingImages}
          removeExistingImage={removeExistingImage}
          disabled={!editable}
        />
        <Button
          variant={'primary'}
          type="button"
          onClick={toggleEditable}
          className={`${editable ? 'hidden' : ''}`}
        >
          Habilitar Edição
        </Button>
        <Button
          type="submit"
          variant={'add'}
          className={`${editable ? '' : 'hidden'}`}
          disabled={!editable || submiting}
        >
          Salvar
        </Button>
        <Button
          type="button"
          variant="delete"
          className={`${editable ? '' : 'hidden'}`}
          disabled={!editable || submiting}
          onClick={async () => await deleteEdificacao(codigo_edificacao)}
        >
          Excluir
        </Button>
        <Button
          type="reset"
          variant="ghost"
          className={`${editable ? '' : 'hidden'}`}
          disabled={!editable}
        >
          Cancelar
        </Button>
      </form>
    </>
  );
}
