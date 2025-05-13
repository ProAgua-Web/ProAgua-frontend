'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { type z } from 'zod';

export default function useZodForm(
  schema: z.Schema,
  defaultValuesMapper: (obj: unknown) => unknown,
) {
  type ObjType = z.infer<typeof schema>;

  const useFormHook = (obj?: ObjType) => {
    const form = useForm<ObjType>({
      resolver: zodResolver(schema),
      defaultValues: obj ? defaultValuesMapper(obj) : undefined,
      mode: 'onBlur',
      reValidateMode: 'onChange',
    });
    useEffect(() => {
      if (obj) {
        form.reset(defaultValuesMapper(obj));
      }
    }, [obj, form]);
    return form;
  };
  return useFormHook;
}
