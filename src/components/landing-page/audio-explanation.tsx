import { motion } from "framer-motion"
import { Mic, FileCheck, Sparkles, ArrowRight, Activity } from "lucide-react"

export function AudioExplanation() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-slate-50/50">
      
      {/* BACKGROUND ANIMADO (Desktop Only para não pesar no mobile) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full z-0 pointer-events-none opacity-30 hidden md:block">
         {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-300"
              initial={{ width: "200px", height: "200px", opacity: 0.8 }}
              animate={{ 
                width: ["200px", "1200px"], 
                height: ["200px", "1200px"], 
                opacity: [0.5, 0] 
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity, 
                delay: i * 1,
                ease: "linear" 
              }}
            />
         ))}
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LADO ESQUERDO: Explicação */}
          <motion.div 
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 0.8 }}
             className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm">
               <Activity className="w-4 h-4 text-indigo-500" />
               <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Transcrição Inteligente</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-light text-slate-900 leading-tight">
              Sua voz é a ferramenta mais <span className="font-normal text-indigo-900">rápida</span>.
            </h2>
            
            <p className="text-base md:text-lg text-slate-600 font-light leading-relaxed">
              O ditado convencional apenas escreve o que você fala. Nossa IA <strong className="font-normal text-slate-800">entende</strong> o contexto médico, filtra ruídos e entrega o essencial.
            </p>

            <div className="space-y-6 pt-4">
               <FeatureItem 
                 icon={Mic}
                 title="Reconhecimento Natural"
                 description="Fale como conversaria com um colega. Sem comandos robóticos."
               />
               <FeatureItem 
                 icon={Sparkles}
                 title="Limpeza Inteligente"
                 description="Removemos 'eh', 'hum', pausas e conversas paralelas automaticamente."
               />
               <FeatureItem 
                 icon={FileCheck}
                 title="Resumo e Estruturação"
                 description="Limpa o texto bruto, resume os pontos principais e organiza as informações automaticamente."
               />
            </div>
          </motion.div>

          {/* LADO DIREITO: Visual Clean da Transformação */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
             {/* Card Principal */}
             <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-xl md:shadow-2xl shadow-slate-200/50 border border-slate-100 p-6 md:p-8 relative overflow-hidden backdrop-blur-xl">
                
                {/* Header Simulado */}
                <div className="flex items-center justify-between mb-6 md:mb-8 opacity-50">
                   <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-slate-200" />
                      <div className="w-3 h-3 rounded-full bg-slate-200" />
                   </div>
                   <div className="h-2 w-20 bg-slate-200 rounded-full" />
                </div>

                {/* Conteúdo */}
                <div className="space-y-6 md:space-y-8 relative z-10">
                   {/* 1. Input de Voz */}
                   <div className="flex items-center gap-3 md:gap-4 p-4 rounded-xl md:rounded-2xl bg-slate-50 border border-slate-100 relative overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 animate-pulse" />
                      
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                         <Mic className="w-4 h-4 md:w-5 md:h-5 text-indigo-600" />
                      </div>
                      <div className="space-y-2 flex-1">
                         <div className="h-2 w-3/4 bg-slate-200 rounded" />
                         <div className="h-2 w-1/2 bg-slate-200 rounded" />
                      </div>
                   </div>

                   {/* Seta */}
                   <div className="flex justify-center">
                      <ArrowRight className="w-5 h-5 text-slate-300 rotate-90" />
                   </div>

                   {/* 2. Output Estruturado */}
                   <div className="p-4 md:p-5 rounded-xl md:rounded-2xl bg-indigo-50/30 border border-indigo-100/50">
                      <div className="flex items-center gap-2 mb-3">
                         <Sparkles className="w-4 h-4 text-indigo-500" />
                         <span className="text-xs font-semibold text-indigo-900 uppercase">Resultado</span>
                      </div>
                      <div className="space-y-3">
                         <div className="flex gap-2">
                            <span className="w-12 md:w-16 h-2 bg-indigo-200 rounded shrink-0" />
                            <span className="flex-1 h-2 bg-slate-200 rounded" />
                         </div>
                         <div className="flex gap-2">
                            <span className="w-8 md:w-12 h-2 bg-indigo-200 rounded shrink-0" />
                            <span className="flex-1 h-2 bg-slate-200 rounded" />
                         </div>
                         <div className="w-3/4 h-2 bg-slate-200 rounded ml-12 md:ml-14" />
                      </div>
                   </div>
                </div>

                <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-60 pointer-events-none" />
             </div>

             {/* Nota Flutuante */}
             <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-2 md:-bottom-6 md:-left-6 bg-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 z-20"
             >
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-green-100 flex items-center justify-center">
                   <Activity className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                </div>
                <div>
                   <div className="text-[10px] md:text-xs text-slate-400 font-medium uppercase">Resumo</div>
                   <div className="text-xs md:text-sm font-semibold text-slate-700">Conciso e Direto</div>
                </div>
             </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}

function FeatureItem({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
   return (
      <div className="flex gap-4 items-start group">
         <div className="w-10 h-10 rounded-full bg-white border border-slate-100 shadow-sm flex items-center justify-center shrink-0 group-hover:border-indigo-200 group-hover:bg-indigo-50 transition-colors">
            <Icon className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
         </div>
         <div>
            <h3 className="text-base font-normal text-slate-900 mb-1">{title}</h3>
            <p className="text-sm text-slate-500 font-light leading-relaxed">{description}</p>
         </div>
      </div>
   )
}