import { useState, type KeyboardEvent } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowUp, Sparkles } from "lucide-react"

interface PromptAreaProps {
  onSend: (message: string) => void
  isLoading?: boolean
}

export function PromptArea({ onSend, isLoading }: PromptAreaProps) {
  const [input, setInput] = useState("")

  function handleSend() {
    if (!input.trim() || isLoading) return
    onSend(input)
    setInput("")
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="p-4 md:p-6 bg-slate-50/80 backdrop-blur-sm shrink-0">
      <div className="max-w-4xl mx-auto relative bg-white rounded-3xl border border-slate-200 shadow-sm focus-within:ring-2 focus-within:ring-slate-100 transition-all duration-300">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Digite sua dúvida clínica..."
          className="min-h-15 max-h-50 w-full resize-none border-0 bg-transparent px-6 py-5 text-base shadow-none focus-visible:ring-0 placeholder:text-slate-400 font-normal"
        />
        
        <div className="absolute right-3 bottom-3">
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            size="icon"
            className="h-10 w-10 rounded-full bg-slate-900 hover:bg-slate-800 disabled:opacity-50 transition-all shadow-sm"
          >
            {isLoading ? (
               <Sparkles className="h-5 w-5 animate-spin text-indigo-300" />
            ) : (
               <ArrowUp className="h-5 w-5 text-white" />
            )}
          </Button>
        </div>
      </div>
      {/* CORREÇÃO: Texto de aviso removido aqui */}
    </div>
  )
}