import { Mic, Square } from "lucide-react"
import { useAudio } from "@/hooks/use-audio"
import { cn } from "@/lib/utils"

type DictationAreaProps = {
  onAssistantResponse: (text: string) => void
  onUserMessage: (text: string) => void
}

export function DictationArea({ onAssistantResponse }: DictationAreaProps) {
  const {
    isRecording,
    startRecording,
    stopRecording,
    sendAudioToN8N
  } = useAudio()

  async function handleClick() {
    if (!isRecording) {
      await startRecording()
      return
    }

    const file = await stopRecording()

    const response = await sendAudioToN8N(file)

    if (typeof response?.reply === "string") {
      onAssistantResponse(response.reply)
    } else {
      onAssistantResponse("A IA não conseguiu processar o áudio.")
    }
  }

  return (
    <section className="w-full">
      <button
        onClick={handleClick}
        className={cn(
          "flex w-full items-center gap-3 sm:gap-4 rounded-2xl border px-3 py-3 sm:px-5 sm:py-4 transition-all",
          isRecording
            ? "border-red-400 bg-red-50"
            : "border-slate-200 bg-white hover:bg-slate-50"
        )}
      >
        <div
          className={cn(
            "flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-full",
            isRecording
              ? "bg-red-500 text-white"
              : "bg-slate-100 text-slate-700"
          )}
        >
          {isRecording ? (
            <Square className="h-4 w-4 sm:h-5 sm:w-5" />
          ) : (
            <Mic className="h-4 w-4 sm:h-5 sm:w-5" />
          )}
        </div>

        <div className="flex flex-col text-left">
          <span className="text-xs sm:text-sm font-medium text-slate-900">
            {isRecording ? "Gravando…" : "Ditado clínico"}
          </span>
          <span className="text-xs sm:text-sm text-slate-500">
            {isRecording
              ? "Clique novamente para parar e enviar para a IA"
              : "Grave a consulta. A IA irá transcrever e organizar o texto."}
          </span>
        </div>
      </button>
    </section>
  )
}