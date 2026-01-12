import { cn } from "@/lib/utils"
import type { Message } from "@/hooks/use-chat"
import { Copy, Check, Bot, User } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface BubbleProps {
  message: Message
}

export function Bubble({ message }: BubbleProps) {
  const isUser = message.role === "user"
  const [hasCopied, setHasCopied] = useState(false)

  // CORREÇÃO DO BUG:
  // Se for mensagem da IA e ainda não tiver conteúdo (streaming não começou),
  // retornamos null. Isso esconde a caixa vazia e deixa apenas o loader do ChatArea visível.
  if (!isUser && !message.content) {
    return null
  }

  function handleCopy() {
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
        {/* Conteúdo da Mensagem */}
        {/* REMOVIDO: O efeito de typewriter artificial. 
            Agora usamos o message.content direto, pois o streaming 
            já cria o efeito visual de digitação naturalmente. */}
        <p className="whitespace-pre-wrap leading-relaxed font-normal min-h-6">
          {message.content}
        </p>

        {/* Botão de Copiar (Apenas para IA e se tiver conteúdo) */}
        {!isUser && message.content.length > 0 && (
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