'use client'

import Header from "@/components/Header"
import Navbar from "@/components/Navbar"

export default function Home() {
  return (
    <main>
      <Header 
        expand={ () => {} }
        collapsed={ false }
      />
      <Navbar 
        collapse={ () => {} }
        collapsed={ false }
      />
      <h1>Hello, world!</h1>
    </main>
  );
}
