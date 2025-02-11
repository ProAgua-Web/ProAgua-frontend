'use client';

import {
  FormContainer,
  FormSection,
  type FormProps,
} from '@/components/form/container';
import { ControlledImageInput } from '@/components/form/input/input-image';
import { ControlledNumberInput } from '@/components/form/input/number-input';
import { ControlledSelect } from '@/components/form/input/select';
import { ControlledTextArea } from '@/components/form/input/text-area';
import { ControlledTextInput } from '@/components/form/input/text-input';
import { Button } from '@/components/ui/button';
import { campusOptions } from '@/lib/utils';
import { useFieldArray } from 'react-hook-form';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import { type EdificacaoSchema } from '../edificacao.form';

export const EdificacaoForm: React.FC<FormProps<EdificacaoSchema>> = ({
  form,
  ...props
}) => {
  const imagensField = useFieldArray({
    control: form.control,
    name: 'imagens',
  });

  return (
    <FormContainer {...props}>
      <FormSection>
        <ControlledTextInput
          control={form.control}
          name="codigo"
          label="Código"
          placeholder="Informe o código da edificação"
        />
        <ControlledTextInput
          control={form.control}
          name="nome"
          label="Nome"
          placeholder="Informe o nome da edificação"
        />
        <ControlledSelect
          control={form.control}
          name="campus"
          label="Campus"
          options={campusOptions}
          placeholder="Selecione o campus"
        />
        <ControlledNumberInput
          control={form.control}
          name="cronograma"
          label="Cronograma"
          placeholder="Informe o cronograma"
        />
      </FormSection>
      <div className="col-span-3">
        <ControlledTextArea
          control={form.control}
          name="informacoes_gerais"
          label="Informações Gerais"
          placeholder="Informe informações adicionais"
        />
      </div>
      <div className="mt-2 flex flex-col">
        <label htmlFor="foto">Imagem:</label>
        {imagensField.fields.map((_, index) => (
          <div key={index} className="col-span-3 grid grid-cols-4 gap-2">
            <ControlledImageInput
              control={form.control}
              name={`imagens.${index}.imagem`}
              label="Imagem"
            />
            <ControlledTextInput
              control={form.control}
              name={`imagens.${index}.description`}
              label="Descrição?"
              placeholder="Informe uma descrição para a imagem"
            />
            <Button
              variant="destructive-ghost"
              onClick={() => {
                imagensField.remove(index);
              }}
            >
              Remover
            </Button>
          </div>
        ))}

        <div className="col-span-3 flex">
          <Button
            variant="ghost"
            className="text-brand-green-500"
            onClick={() => {
              imagensField.append({
                imagem: '',
                description: '',
              });
            }}
          >
            <MdOutlineAddCircleOutline size={20} />
            Nova Imagem
          </Button>
        </div>
      </div>
    </FormContainer>
  );
};
