'use client'

import Header from "@/components/layout/Header"
import Navbar from "@/components/layout/Navbar"

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
