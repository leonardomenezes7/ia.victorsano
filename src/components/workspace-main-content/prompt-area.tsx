import { ArrowRight } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

type PromptAreaProps = {
  onSend: (text: string) => void
}

export function PromptArea({ onSend }: PromptAreaProps) {
  const [value, setValue] = useState("")

  function handleSend() {
    const text = value.trim()
    if (!text) return

    onSend(text)
    setValue("")
  }

  return (
    <section className="w-full">
      <div className="relative">
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Descreva o contexto clínico, a pergunta ou o caso que você deseja que a IA analise…"
          className="min-h-28 sm:min-h-40 resize-none rounded-2xl text-sm sm:text-base leading-relaxed p-3 sm:p-5 pr-12 sm:pr-14 focus-visible:ring-1 focus-visible:ring-slate-200 focus-visible:shadow-none"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              handleSend()
            }
          }}
        />
        <button
          type="button"
          onClick={handleSend}
          className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl sm:rounded-2xl
          bg-slate-900 text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  )
}