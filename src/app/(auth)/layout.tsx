import Image from 'next/image';
import Logo from '/public/Logo.svg';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-screen w-full items-center justify-center bg-[#f2f2f2]">
      <div
        id="login-container"
        className="flex h-full w-full min-w-[500px] flex-col overflow-hidden rounded-md shadow-lg lg:h-[80vh] lg:w-[75vw] lg:flex-row"
      >
        <section
          id="login-aside-logo"
          className={`flex h-1/5 select-none flex-row-reverse items-center justify-center gap-4 bg-primary-500 bg-right-bottom bg-no-repeat p-4 text-white lg:h-full lg:w-3/5 lg:flex-col lg:bg-login-background`}
        >
          <Image
            src={Logo}
            className="pointer-events-none flex h-36 w-36 justify-start object-fill p-8 lg:h-64 lg:w-64"
            alt="Logo do projeto"
          />
          <span className="text-center text-6xl">ProÁgua</span>
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
