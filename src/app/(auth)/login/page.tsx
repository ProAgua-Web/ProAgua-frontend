"use client";
import Logo from "/public/Logo.svg";

import Input from "@/components/layout/form/Input";
import Image from "next/image";
import Button from "@/components/layout/form/Button";
import { FormEvent, useState } from "react";

export default function Login() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    const data = {
      username: formData.get("email"),
      password: formData.get("password"),
    };

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (response.status != 200 || responseData == null) {
      alert(`Erro ao fazer login!`);
      setIsSubmitting(false);
    } else {
      alert("Login efetuado com sucesso!");
      setIsSubmitting(false);

      let token = responseData.access_token;
      localStorage.setItem("token", token);

      window.location.href = "/admin/dashboard";
    }
    
  }


  return (
    <main className="flex h-screen w-full items-center justify-center bg-[#f2f2f2]">
      <div
        id="login-container"
        className="h-full lg:h-[80vh] w-full lg:w-[75vw] min-w-[500px] flex flex-col lg:flex-row overflow-hidden rounded-md shadow-lg"
      >
        <section
          id="login-aside-logo"
          className={`h-1/5 lg:h-full lg:w-3/5 flex flex-row-reverse lg:flex-col items-center justify-center gap-4 bg-primary-500 lg:bg-login-background bg-right-bottom bg-no-repeat text-white select-none p-4`}
        >
          <Image
            src={Logo}
            className="pointer-events-none h-36 lg:h-64 w-36 lg:w-64 object-fill p-8 flex justify-start"
            alt="Logo do projeto"
          />
          <span className="text-6xl text-center">ProÁgua</span>
        </section>
        <section
          id="login-form"
          className="flex h-full w-auto flex-grow flex-col items-center justify-center gap-1 bg-white p-20"
        >
          {/* <span><Image src={Logo} alt="Logo do projeto"/></span>  */}
          <h1 className="text-4xl font-medium flex items-center gap-2">Login</h1>
          <form onSubmit={submitForm}
            className="flex h-full w-full flex-grow flex-col items-center justify-center gap-2">
            <Input label="Email" type="text" name="email" value="" required={true} />
            <Input label="Senha" type="password" name="password" value="" required={true} />
            <a className="flex self-end text-[#1098F7]" href="">
              Esqueceu a senha?
            </a>
            <input
              className="min-h-10 w-full flex justify-center rounded-md border bg-primary-500 p-3 text-white hover:bg-primary-600 disabled:bg-primary-400 disabled:cursor-not-allowed"
              type="submit"
              value={isSubmitting ? "Entrando..." : "Entrar"}
              disabled={isSubmitting}
            />
          </form>
        </section>
      </div>
    </main>
  );
}
