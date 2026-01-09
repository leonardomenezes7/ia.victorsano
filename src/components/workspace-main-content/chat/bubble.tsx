import { cn } from "@/lib/utils"
import type { Message } from "@/hooks/use-chat"
import { Copy, Check, Bot, User } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface BubbleProps {
  message: Message
}

export function Bubble({ message }: BubbleProps) {
  const isUser = message.role === "user"
  const [hasCopied, setHasCopied] = useState(false)
  
  // Estado para controlar o texto que está sendo "digitado" na tela
  const [displayedContent, setDisplayedContent] = useState(isUser ? message.content : "")

  // Efeito de Digitação (Typewriter)
  useEffect(() => {
    // Se for usuário, não faz animação, mostra direto
    if (isUser) {
      setDisplayedContent(message.content)
      return
    }

    // Se for IA, faz a animação
    let currentIndex = 0
    const fullText = message.content
    const speed = 10 // 10ms por caractere (Rápido e Fluido)

    const intervalId = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayedContent(fullText.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        clearInterval(intervalId)
      }
    }, speed)

    // Limpeza do intervalo caso o componente desmonte
    return () => clearInterval(intervalId)
  }, [message.content, isUser])

  function handleCopy() {
    // Copiamos sempre o texto completo original, não apenas o que já foi renderizado
    navigator.clipboard.writeText(message.content)
    setHasCopied(true)
    setTimeout(() => setHasCopied(false), 2000)
  }

  return (
    <div className={cn(
      "flex w-full gap-3",
      isUser ? "justify-end" : "justify-start"
    )}>
      {/* Avatar da IA */}
      {!isUser && (
        <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full bg-indigo-100 text-indigo-600 border border-indigo-200">
          <Bot className="h-4 w-4" />
        </div>
      )}

      <div className={cn(
        "relative group max-w-[85%] sm:max-w-[75%] rounded-2xl px-5 py-4 text-base shadow-sm transition-all",
        isUser 
          ? "bg-slate-900 text-white rounded-tr-sm" 
          : "bg-white border border-slate-200 text-slate-700 rounded-tl-sm"
      )}>
        {/* Conteúdo da Mensagem (Renderiza o texto animado) */}
        <p className="whitespace-pre-wrap leading-relaxed font-normal min-h-6">
          {displayedContent}
          {/* Cursor piscante apenas enquanto está digitando (opcional, visual hack) */}
          {!isUser && displayedContent.length < message.content.length && (
            <span className="inline-block w-1 h-4 ml-1 bg-indigo-500 animate-pulse align-middle" />
          )}
        </p>

        {/* Botão de Copiar (Apenas para IA) */}
        {!isUser && (
          <div className="mt-2 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-200 pt-2 border-t border-slate-100">
             <Button
                variant="ghost"
                size="icon"
                onClick={handleCopy}
                className="h-6 w-6 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md"
                title="Copiar resposta"
              >
                {hasCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
             </Button>
          </div>
        )}
      </div>

      {/* Avatar do Usuário */}
      {isUser && (
        <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full bg-slate-200 text-slate-600">
          <User className="h-4 w-4" />
        </div>
      )}
    </div>
  )
}