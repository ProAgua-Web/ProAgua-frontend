"use client";

import { Button } from "@/components/ui/button";
import { LabeledInput } from "@/components/widgets/labeled-input";
import { FormEvent, useState } from "react";
import Spinner from "@/components/widgets/spinner";

export default function ResetPasswordForm() {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    async function submitForm(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        setIsSubmitting(true);
        alert("Redefinir senha não implementado ainda!");
        setIsSubmitting(false);

    }


    return (
        <form
            onSubmit={submitForm}
            className="w-full h-full flex flex-col justify-between items-center gap-6"
        >
            <h1 className="text-4xl font-medium text-center">Recuperar acesso</h1>

            <div className="w-full flex flex-col flex-grow justify-center gap-12">
                <LabeledInput
                    label="E-mail"
                    name="email"
                    type="email"
                    required={true}
                    className="w-full"
                />
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="primary"
                    className="w-full min-h-16 flex justify-center"
                >
                    {isSubmitting ?
                        <> <Spinner /> Enviando... </>
                        : "Enviar código de recuperação"
                    }
                </Button>
            </div>
        </form>
    );
}
