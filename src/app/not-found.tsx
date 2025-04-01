import Header from '@/components/layout/header';
import Image from 'next/image';

export default function NotFound() {
  return (
    <main className="flex h-screen w-full flex-col">
      <Header />
      <div className="flex w-full flex-grow flex-col items-center justify-center">
        <Image
          src="/gotinha.svg"
          alt="Gotinha triste"
          width={100}
          height={100}
          className="w-1/2 max-w-[200px]"
        />
        <h1 className="text-3xl">404 - Not Found!</h1>
      </div>
    </main>
  );
}
