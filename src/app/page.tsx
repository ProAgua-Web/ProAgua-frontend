import Header from "@/components/Header"

export default function Home() {
  return (
    <main>
      <Header 
        collapseFunction={ () => {} }
        collapsed={ false }
      />
      <h1>Hello, world!</h1>
    </main>
  );
}
