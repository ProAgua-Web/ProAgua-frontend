import {
  FormContainer,
  type FormProps,
  FormSection,
} from '@/components/form/container';
import { ControlledCheckbox } from '@/components/form/input/checkbox';
import { ControlledMaskedInput } from '@/components/form/input/masked-input';
import {
  cloroMask,
  corMask,
  temperaturaMask,
  turbidezMask,
} from '@/lib/input-mask';
import { type ReferenciaSchema } from '../referencia.form';

export const ReferenciaForm: React.FC<FormProps<ReferenciaSchema>> = ({
  form,
  ...props
}) => {
  return (
    <FormContainer {...props}>
      <FormSection className="lg:grid-cols-2">
        <ControlledMaskedInput
          control={form.control}
          name="min_temperatura"
          label="Temperatura mínima"
          placeholder="Informe a temperatura"
          mask={temperaturaMask}
        />
        <ControlledMaskedInput
          control={form.control}
          name="max_temperatura"
          label="Temperatura máxima"
          placeholder="Informe a temperatura"
          mask={temperaturaMask}
        />
      </FormSection>
      <FormSection className="lg:grid-cols-2">
        <ControlledMaskedInput
          control={form.control}
          name="min_cloro_residual_livre"
          label="Cloro residual livre mínimo"
          placeholder="Informe o cloro residual livre"
          mask={cloroMask}
        />
        <ControlledMaskedInput
          control={form.control}
          name="max_cloro_residual_livre"
          label="Cloro residual livre máximo"
          placeholder="Informe o cloro residual livre"
          mask={cloroMask}
        />
      </FormSection>
      <FormSection className="lg:grid-cols-2">
        <ControlledMaskedInput
          control={form.control}
          name="min_turbidez"
          label="Turbidez mínima"
          placeholder="Informe a turbidez"
          mask={turbidezMask}
        />
        <ControlledMaskedInput
          control={form.control}
          name="max_turbidez"
          label="Turbidez máxima"
          placeholder="Informe a turbidez"
          mask={turbidezMask}
        />
      </FormSection>
      <FormSection className="lg:grid-cols-2">
        <ControlledMaskedInput
          control={form.control}
          name="min_cor"
          label="Cor mínima"
          placeholder="Informe a cor"
          mask={corMask}
        />
        <ControlledMaskedInput
          control={form.control}
          name="max_cor"
          label="Cor máxima"
          placeholder="Informe a cor"
          mask={corMask}
        />
      </FormSection>
      <FormSection className="lg:grid-cols-2">
        <ControlledCheckbox
          control={form.control}
          name="coliformes_totais"
          label="Presença de coliformes totais"
        />
      </FormSection>
      <FormSection className="lg:grid-cols-2">
        <ControlledCheckbox
          control={form.control}
          name="escherichia"
          label="Presença de Escherichia coli"
        />
      </FormSection>
    </FormContainer>
  );
};
