import { Button } from "@/components/ui/button"
import { DoorOpen } from "lucide-react"

export function Hero() {
  return (
    <section className="relative flex min-h-screen w-full items-start justify-center overflow-hidden">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-6 pt-52 text-center">
        <h1 className="text-4xl leading-tight tracking-tight text-black md:text-5xl lg:text-6xl font-light">
          O conhecimento do Dr. Victor Sano,
          <br />
          potencializado por{" "}
          <span className="bg-linear-to-r from-emerald-400 via-sky-400 to-violet-400 bg-size-[300%_300%] bg-clip-text text-transparent animate-hero-gradient">
            inteligência artificial.
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
          Conheça a IA que auxilia o Dr. Victor Sano a potencializar seu conhecimento
          de forma prática, confiante e eficaz.
        </p>
        <div className="group relative mt-10 flex items-center justify-center">
          <span
            className="absolute inset-0 rounded-full ring-2 ring-slate-400/60
            transition-transform duration-300 ease-out
            group-hover:scale-[1.05] group-focus-within:scale-[1.05]"
          />
          <span
            className="absolute -inset-2 rounded-full ring-2 ring-slate-400/40
            transition-transform duration-300 ease-out
            group-hover:scale-[1.06] group-focus-within:scale-[1.06]"
          />
          <span
            className="absolute -inset-4 rounded-full ring-1 ring-slate-400/30
            transition-transform duration-300 ease-out
            group-hover:scale-[1.07] group-focus-within:scale-[1.07]"
          />

          <Button
            asChild
            className="relative z-10 flex items-center gap-4 rounded-full py-8 text-sm font-medium
              bg-black text-white
              transition-transform duration-300 ease-out
              hover:scale-[1.05] focus-visible:scale-[1.05]
              cursor-pointer"
          >
            <a href="/workspace" className="flex justify-between">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
                <DoorOpen className="h-8 w-8 text-black" />
              </span>
              Acesse o workspace
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}