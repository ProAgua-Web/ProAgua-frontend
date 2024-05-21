"use client";
import Logo from "/public/Logo.svg";

import Input from "@/components/layout/form/Input";
import Image from "next/image";
import Button from "@/components/layout/form/Button";

export default function Login() {
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
          <form className="flex h-full w-full flex-grow flex-col items-center justify-center gap-2">
            <Input label="Email" type="email" name="email" value="" required={true} />
            <Input label="Senha" type="password" name="password" value="" required={true} />
            <a className="flex self-end text-[#1098F7]" href="">
              Esqueceu a senha?
            </a>
            {/* <Button label="Login" onClick={() => {}}></Button> */}
            <a
              className="min-h-10 w-full flex justify-center rounded-md border bg-primary-500 p-3 text-white hover:bg-primary-600"
              href="/admin/dashboard"
            >
              Entrar
            </a>
          </form>
        </section>
      </div>
    </main>
  );
}
