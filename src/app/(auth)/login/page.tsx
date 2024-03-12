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
        className="flex h-[80vh] w-[70vw] overflow-hidden rounded-md shadow-lg"
      >
        <section
          id="login-aside-logo"
          className={`flex w-1/2 select-none flex-col items-center justify-center gap-4 bg-primary-500 bg-login-background bg-right-bottom bg-no-repeat text-white`}
        >
          <Image
            src={Logo}
            className="pointer-events-none h-64 w-full object-fill	"
            alt="Logo do projeto"
          />
          <span className="text-6xl">ProÁgua</span>
        </section>
        <section
          id="login-form"
          className="flex h-full w-auto flex-grow flex-col items-center justify-center gap-1 bg-white px-20 pt-24"
        >
          <h1 className="text-4xl font-medium">Login</h1>
          <form className="flex h-full w-full flex-grow flex-col items-center justify-center gap-2">
            <Input label="Email" type="email" name="email" value="" />
            <Input label="Senha" type="password" name="password" value="" />
            <a className="flex self-end text-[#1098F7]" href="">
              Esqueceu a senha?
            </a>
            <Button label="Login" onClick={() => {}}></Button>
          </form>
        </section>
      </div>
    </main>
  );
}
