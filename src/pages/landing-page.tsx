import { Header } from "@/components/landing-page/header"
import { Hero } from "@/components/landing-page/hero"

export function LandingPage() {
  return (
    <main className="w-full min-h-screen bg-gray-100 overflow-hidden">
      <Header/>
      <Hero/>
    </main>
  )
}