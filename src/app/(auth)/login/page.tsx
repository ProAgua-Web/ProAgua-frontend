"use client"
import Logo from "/public/Logo.svg"

import Input from "@/components/layout/form/Input"
import Image from "next/image"
import Button from "@/components/layout/form/Button"

export default function Login() {
    return (
        <main className="w-full h-screen flex justify-center items-center bg-[#f2f2f2]">
            <div id="login-container" className="w-[70vw] h-[80vh] flex overflow-hidden rounded-md shadow-lg">
                <section id="login-aside-logo" className={`w-1/2 flex flex-col gap-4 justify-center items-center bg-primary-500 bg-login-background bg-no-repeat bg-right-bottom text-white select-none`}>
                    <Image
                        src={Logo}
                        className="w-full h-64 object-fill pointer-events-none	"
                        alt="Logo do projeto"
                    />
                    <span className="text-6xl">ProÁgua</span>
                </section>
                <section id="login-form" className="w-auto h-full flex flex-col flex-grow justify-center items-center gap-1 px-20 pt-24 bg-white">
                    <h1 className="text-4xl font-medium">Login</h1>
                    <form className="w-full h-full flex flex-grow flex-col justify-center items-center gap-2">
                        <Input label="Email" type="email" name="email" value="" />
                        <Input label="Senha" type="password" name="password" value="" />
                        <a className="text-[#1098F7] flex self-end" href="">Esqueceu a senha?</a>
                        <Button label="Login" onClick={() => { }}></Button>
                    </form>
                </section>
            </div>
        </main>
    )
}