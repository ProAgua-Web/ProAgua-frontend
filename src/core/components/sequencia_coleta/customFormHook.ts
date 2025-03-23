import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";


export default function customFormHook(schema: z.Schema, defaultValuesMapper: (obj: any) => any) {
    type ObjType = z.infer<typeof schema>;

    const formHook = (obj?: ObjType) => {
        const form = useForm<ObjType>({
            resolver: zodResolver(schema),
            defaultValues: obj ? defaultValuesMapper(obj) : undefined,
            mode: 'onBlur',
            reValidateMode: 'onChange',
        });
        useEffect(() => {
            if (obj) {
                for (let attr in obj) {
                    form.setValue(attr, obj[attr])
                }
            }
        }, [obj, form]);
        return form;
    }
    return formHook;
}

