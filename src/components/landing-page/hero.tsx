import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, BrainCircuit } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-dvh w-full flex flex-col items-center justify-center overflow-hidden bg-white pt-20 md:pt-0">
      
      {/* BACKGROUND ANIMADO (Responsivo) */}
      <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[40%] border-[1.5px] border-indigo-300/60"
            initial={{ width: "50vw", height: "50vw", rotate: 0 }}
            animate={{ 
              rotate: 360,
              scale: [1, 1.15, 1],
              borderRadius: ["40%", "45%", "40%"]
            }}
            transition={{ 
              duration: 20 + i * 5, 
              repeat: Infinity, 
              ease: "linear",
              delay: i * 2
            }}
            style={{
              // Mobile: usa vh/vw maiores para preencher. Desktop: mantém o original.
              width: `max(${55 + i * 15}vw, ${40 + i * 10}vh)`,
              height: `max(${55 + i * 15}vw, ${40 + i * 10}vh)`,
            }}
          />
        ))}
      </div>
      
      <div className="absolute inset-0 bg-radial-gradient from-white/40 via-white/60 to-white/90 z-0 pointer-events-none" />

      {/* CONTEÚDO */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
        
        {/* Headline Ajustada */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-slate-900 mb-6 md:mb-8 max-w-5xl mx-auto leading-tight"
        >
          Inteligência Artificial restrita à expertise do <span className="font-normal text-indigo-900">Dr. Victor Sano</span>.
        </motion.h1>

        {/* Subheadline Ajustada */}
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-slate-600 font-light max-w-2xl mx-auto leading-relaxed mb-8 md:mb-12 px-2"
        >
          Sem dados genéricos. Sem alucinações. Esta tecnologia consulta estritamente a base de protocolos confiados pelo especialista.
        </motion.p>

        {/* CTA Otimizado para Mobile */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="p-1 rounded-full bg-slate-100/80 backdrop-blur-sm shadow-xl w-full sm:w-auto">
            <Button
              className="rounded-full w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-10 text-sm sm:text-base font-normal bg-slate-900 hover:bg-slate-800 text-white border-0 transition-all shadow-lg hover:shadow-2xl hover:-translate-y-1 group whitespace-normal sm:whitespace-nowrap"
              onClick={() => window.open("https://tria.health", "_blank")}
            >
              <BrainCircuit className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-indigo-300 shrink-0" />
              Desenvolver IA com meus protocolos
              <ArrowRight className="ml-2 sm:ml-3 h-4 w-4 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0" />
            </Button>
          </div>
          
          <p className="text-xs text-slate-400 font-light tracking-wide">
            Tecnologia desenvolvida por <strong className="font-normal text-slate-600">TRIA</strong>
          </p>
        </motion.div>

      </div>
    </section>
  )
}