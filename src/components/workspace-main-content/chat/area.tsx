import { useEffect, useRef } from "react"
import type { Message } from "@/hooks/use-chat"
import { Bubble } from "./bubble"
import { Sparkles } from "lucide-react"

interface ChatAreaProps {
  messages: Message[]
  isLoading?: boolean
}

export function ChatArea({ messages, isLoading }: ChatAreaProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      })
    }
  }, [messages, isLoading])

  return (
    <div 
      ref={scrollRef}
      className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 scroll-smooth"
    >
      {messages.length === 0 ? (
        // CORREÇÃO: Removido 'opacity-50'. Agora o texto e ícone ficam 100% nítidos.
        <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
          <div className="bg-white p-4 rounded-full shadow-sm border border-slate-100">
            <Sparkles className="h-8 w-8 text-indigo-500" />
          </div>
          <div>
            <h3 className="text-xl font-normal text-slate-900">Como posso ajudar?</h3>
            <p className="text-sm text-slate-500">Inicie uma conversa para tirar dúvidas clínicas.</p>
          </div>
        </div>
      ) : (
        messages.map((msg, index) => (
          <Bubble key={index} message={msg} />
        ))
      )}

      {isLoading && (
        <div className="flex justify-start w-full gap-3">
           <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 border border-indigo-200 animate-pulse">
              <Sparkles className="h-4 w-4" />
           </div>
           <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
           </div>
        </div>
      )}
    </div>
  )
}