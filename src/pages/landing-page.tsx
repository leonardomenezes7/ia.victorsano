import { Header } from "@/components/landing-page/header"
import { Hero } from "@/components/landing-page/hero"
import { AudioExplanation } from "@/components/landing-page/audio-explanation"
import { Differentials } from "@/components/landing-page/differentials" // Importar

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <Header />
      
      <main>
        <Hero />
  
        <AudioExplanation />

        <Differentials />
      </main>
    </div>
  )
}