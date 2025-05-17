'use client';

import {
  FormContainer,
  FormSection,
  type FormProps,
} from '@/components/form/container';
import { ControlledCheckbox } from '@/components/form/input/checkbox';
import { ControlledTextInput } from '@/components/form/input/text-input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { HiOutlineEye, HiOutlineEyeSlash } from 'react-icons/hi2';
import { type CriarUsuarioSchema } from '../usuario.form';

export const UsuarioForm: React.FC<FormProps<CriarUsuarioSchema>> = ({
  form,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <FormContainer {...props}>
      <FormSection>
        <ControlledTextInput
          control={form.control}
          name="first_name"
          label="Primeiro nome"
          placeholder="Digite o primeiro nome"
        />
        <ControlledTextInput
          control={form.control}
          name="last_name"
          label="Sobrenome"
          placeholder="Digite o sobrenome"
        />
        <ControlledTextInput
          control={form.control}
          name="username"
          label="Nome de usuário"
          placeholder="Digite o nome de usuário"
        />
        <ControlledTextInput
          control={form.control}
          name="email"
          label="Email"
          placeholder="Digite o email"
        />
        <ControlledTextInput
          control={form.control}
          name="password"
          label="Senha"
          type={showPassword ? 'text' : 'password'}
          icon={
            <Button
              variant="ghost"
              className="absolute right-0 top-0 hover:bg-transparent"
              size="icon"
              onClick={() => setShowPassword(!showPassword)}
              type="button"
            >
              {showPassword ? (
                <HiOutlineEyeSlash
                  className="text-slate-500 hover:scale-105"
                  size={20}
                />
              ) : (
                <HiOutlineEye
                  className="text-slate-500 hover:scale-105"
                  size={20}
                />
              )}
            </Button>
          }
        />
      </FormSection>
      <FormSection>
        <ControlledCheckbox
          control={form.control}
          name="is_superuser"
          label="Administrador"
        />
      </FormSection>
    </FormContainer>
  );
};
