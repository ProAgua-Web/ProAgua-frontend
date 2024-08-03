import Image from "next/image";
import Logo from "/public/Logo.svg";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
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
                    {children}
                </section>
            </div>
        </main>
    );
}
