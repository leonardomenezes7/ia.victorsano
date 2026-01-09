import { motion } from "framer-motion"
import { BrainCircuit, ShieldAlert, Fingerprint, SearchCheck, X, Check } from "lucide-react"
import { cn } from "@/lib/utils"

export function Differentials() {
  return (
    <section className="py-20 md:py-32 bg-white overflow-hidden relative">
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Cabeçalho */}
        <div className="max-w-4xl mx-auto text-center mb-12 md:mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-light text-slate-900 mb-4 md:mb-6 leading-tight"
          >
            O ChatGPT leu a internet inteira.<br />
            <span className="font-normal text-indigo-900">Sua IA leu apenas o que importa: Você.</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base md:text-xl text-slate-500 font-light leading-relaxed max-w-2xl mx-auto"
          >
            Modelos públicos são treinados para agradar a todos. 
            Nós construímos um <strong className="font-normal text-slate-700">segundo cérebro</strong> que replica exclusivamente a sua conduta.
          </motion.p>
        </div>

        {/* Grid de Cards Responsivo (1 col mobile -> 3 col desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          
          <DifferentialCard 
            icon={BrainCircuit}
            title="Especialista vs. Generalista"
            delay={0}
          >
            <ComparisonItem 
              isNegative 
              text="IAs Genéricas respondem sobre culinária e medicina com a mesma confiança."
            />
            <ComparisonItem 
              isPositive 
              text="Sua IA é blindada. Ela só respira seus protocolos, ignorando ruídos externos."
            />
          </DifferentialCard>

          <DifferentialCard 
            icon={ShieldAlert}
            title="Alucinação vs. Precisão"
            delay={0.2}
          >
            <ComparisonItem 
              isNegative 
              text="Modelos públicos inventam fatos convincentes quando não sabem a resposta."
            />
            <ComparisonItem 
              isPositive 
              text="Se a resposta não estiver na sua base, sua IA diz 'não sei'. Risco zero."
            />
          </DifferentialCard>

          <DifferentialCard 
            icon={Fingerprint}
            title="Robô vs. Você Digital"
            delay={0.4}
          >
            <ComparisonItem 
              isNegative 
              text="Textos padronizados, frios e com cara de 'foi escrito por IA'."
            />
            <ComparisonItem 
              isPositive 
              text="Treinada no seu tom de voz e na sua forma de acolher o paciente."
            />
          </DifferentialCard>

        </div>

        {/* Faixa de Conclusão */}
        <motion.div 
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.6, duration: 0.8 }}
           className="mt-16 md:mt-20 p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] bg-slate-50 border border-slate-100 text-center relative overflow-hidden"
        >
           <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-indigo-400 to-transparent opacity-50" />
           
           <div className="relative z-10 max-w-3xl mx-auto">
              <SearchCheck className="w-10 h-10 md:w-12 md:h-12 text-indigo-500 mx-auto mb-4 md:mb-6 opacity-80" />
              <h3 className="text-xl md:text-3xl font-light text-slate-900 mb-3 md:mb-4">
                 Não é sobre substituir o médico.
              </h3>
              <p className="text-base md:text-lg text-slate-600 font-light">
                 É sobre libertar o médico da burocracia para que ele possa exercer a <span className="font-normal text-indigo-900">arte da medicina</span>.
              </p>
           </div>
        </motion.div>

      </div>
    </section>
  )
}

function DifferentialCard({ icon: Icon, title, children, delay }: { icon: any, title: string, children: React.ReactNode, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      className="group h-full bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-500"
    >
      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-indigo-50 transition-colors duration-500">
        <Icon className="w-5 h-5 md:w-6 md:h-6 text-slate-400 group-hover:text-indigo-600 transition-colors duration-500" />
      </div>
      
      <h3 className="text-lg md:text-xl font-normal text-slate-900 mb-6 md:mb-8">{title}</h3>
      
      <div className="space-y-6 relative">
        <div className="absolute left-2.75 top-2 bottom-2 w-px bg-slate-100" />
        {children}
      </div>
    </motion.div>
  )
}

function ComparisonItem({ isPositive, text, isNegative }: { isPositive?: boolean, isNegative?: boolean, text: string }) {
  return (
    <div className={cn("relative flex gap-4", isNegative && "opacity-60")}>
      <div className={cn(
        "z-10 w-6 h-6 rounded-full flex items-center justify-center shrink-0 border",
        isPositive ? "bg-indigo-100 border-indigo-200 text-indigo-600" : "bg-slate-100 border-slate-200 text-slate-400"
      )}>
        {isPositive ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
      </div>
      <p className={cn(
        "text-sm leading-relaxed font-light",
        isPositive ? "text-slate-800 font-normal" : "text-slate-500 line-through decoration-slate-300"
      )}>
        {text}
      </p>
    </div>
  )
}