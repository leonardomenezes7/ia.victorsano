import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { MainContent } from "@/components/workspace-main-content/main-content"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { 
  Mic, 
  Square, 
  Sparkles, 
  Copy, 
  Check, 
  Trash2, 
  AlignLeft 
} from "lucide-react"
import { useSpeechRecognition } from "@/hooks/use-speech-recognition"
import { cleanTranscriptWithAI } from "@/services/clean-transcript"
import { cn } from "@/lib/utils"

export function AudioMode() {
  const {
    isRecording,
    transcript,
    startRecording,
    stopRecording,
    setTranscript
  } = useSpeechRecognition()

  const [aiResponse, setAiResponse] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [hasCopied, setHasCopied] = useState(false)

  async function handleSendToAI() {
    if (!transcript) return
    setIsProcessing(true)
    const result = await cleanTranscriptWithAI(transcript)
    if (result) setAiResponse(result)
    setIsProcessing(false)
  }

  function handleCopy() {
    navigator.clipboard.writeText(aiResponse)
    setHasCopied(true)
    setTimeout(() => setHasCopied(false), 2000)
  }

  function handleClear() {
    if(confirm("Deseja apagar todo o conteúdo?")) {
      setTranscript("")
      setAiResponse("")
    }
  }

  return (
    <div className="h-screen w-screen flex flex-col-reverse md:flex-row overflow-hidden bg-slate-50/50">
      <Sidebar />
      <MainContent>
        <div className="h-full flex flex-col max-w-400 mx-auto w-full p-4 md:p-6 gap-4 md:gap-6">
          
          {/* Cabeçalho */}
          <div className="flex items-center justify-between shrink-0">
            <div>
              <h1 className="text-xl md:text-2xl font-normal text-slate-900 tracking-tight">Ditado Inteligente</h1>
              <p className="text-slate-500 text-xs md:text-sm mt-1 font-light">Grave seus insights e deixe a IA estruturar.</p>
            </div>
            
            {(transcript || aiResponse) && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleClear}
                className="text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors font-normal h-8"
              >
                <Trash2 className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Limpar Sessão</span>
              </Button>
            )}
          </div>

          {/* Área Principal */}
          {/* CORREÇÃO 1: min-h-0 aqui impede que o grid estoure a altura da tela */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 min-h-0">
            
            {/* LADO ESQUERDO: Entrada */}
            <div className="flex flex-col bg-white rounded-2xl md:rounded-3xl border border-slate-200 shadow-sm overflow-hidden group focus-within:ring-2 focus-within:ring-slate-100 transition-all duration-300">
              
              {/* Header Card */}
              <div className="px-4 py-3 md:px-6 md:py-4 border-b border-slate-50 flex items-center justify-between bg-white shrink-0">
                <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                  <div className={cn("w-2 h-2 rounded-full transition-colors", isRecording ? "bg-red-500 animate-pulse" : "bg-slate-300")} />
                  <span className="hidden sm:inline">Transcrição bruta</span>
                  <span className="sm:hidden">Transcrição</span>
                </div>
                
                <Button
                  onClick={isRecording ? stopRecording : startRecording}
                  variant={isRecording ? "destructive" : "default"}
                  size="sm"
                  className={cn(
                    "rounded-full px-4 md:px-5 transition-all duration-300 shadow-sm font-normal text-xs md:text-sm h-8 md:h-9", 
                    isRecording ? "bg-red-500 hover:bg-red-600" : "bg-slate-900 hover:bg-slate-800"
                  )}
                >
                  {isRecording ? (
                    <><Square className="mr-2 h-3 w-3 fill-current" /> Parar</>
                  ) : (
                    <><Mic className="mr-2 h-3.5 w-3.5" /> Gravar</>
                  )}
                </Button>
              </div>

              {/* Área de Texto (Input) */}
              {/* CORREÇÃO 2: flex-1 e min-h-0 no container, h-full no textarea */}
              <div className="flex-1 relative min-h-0">
                <Textarea 
                  value={transcript}
                  onChange={(e) => setTranscript(e.target.value)}
                  placeholder="Toque em gravar e fale..."
                  className="w-full h-full p-4 md:p-6 text-base md:text-lg text-slate-600 border-0 resize-none focus-visible:ring-0 bg-transparent placeholder:text-slate-300 font-normal leading-relaxed overflow-y-auto"
                />
                
                {isRecording && (
                   <div className="absolute bottom-4 left-4 md:left-6 text-xs text-red-500 animate-pulse flex items-center gap-1.5 font-normal bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full pointer-events-none">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full" /> Gravando...
                   </div>
                )}
              </div>

              {/* Footer Card */}
              <div className="p-3 bg-slate-50/50 border-t border-slate-100 flex justify-end shrink-0">
                <Button
                  onClick={handleSendToAI}
                  disabled={!transcript || isRecording || isProcessing}
                  size="sm"
                  className={cn(
                    "rounded-xl transition-all duration-300 bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm disabled:opacity-50 font-normal px-4 md:px-5 w-full md:w-auto",
                    isProcessing && "opacity-80"
                  )}
                >
                  {isProcessing ? (
                    <><Sparkles className="mr-2 h-4 w-4 animate-spin" /> Processando...</>
                  ) : (
                    <><Sparkles className="mr-2 h-4 w-4" /> Transformar com IA</>
                  )}
                </Button>
              </div>
            </div>

            {/* LADO DIREITO: Saída */}
            <div className={cn(
              "flex flex-col bg-white rounded-2xl md:rounded-3xl border border-slate-200 shadow-sm overflow-hidden",
              !aiResponse && "hidden md:flex"
            )}>
              <div className="px-4 py-3 md:px-6 md:py-4 border-b border-slate-50 flex items-center justify-between bg-white shrink-0">
                <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                  <AlignLeft className="w-4 h-4 text-indigo-500/70" />
                  <span className="hidden sm:inline">Resultado formatado</span>
                  <span className="sm:hidden">Resultado</span>
                </div>
                
                {aiResponse && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                    className="text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full font-normal h-8 px-3"
                  >
                    {hasCopied ? (
                      <><Check className="w-3.5 h-3.5 mr-1.5" /> <span className="hidden sm:inline">Copiado</span></>
                    ) : (
                      <><Copy className="w-3.5 h-3.5 mr-1.5" /> <span className="hidden sm:inline">Copiar</span></>
                    )}
                  </Button>
                )}
              </div>

              {/* Área de Conteúdo (Output) */}
              {/* CORREÇÃO 3: flex-1, overflow-y-auto e min-h-0 garantem o scroll interno */}
              <div className="flex-1 p-4 md:p-6 overflow-y-auto bg-white min-h-0 scroll-smooth">
                {aiResponse ? (
                  <div className="prose prose-slate max-w-none prose-p:font-normal prose-headings:font-normal prose-p:text-base md:prose-p:text-lg">
                    <p className="leading-relaxed text-slate-700 whitespace-pre-wrap font-normal">
                      {aiResponse}
                    </p>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-300 gap-3 select-none py-10">
                    <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center">
                       <Sparkles className="w-5 h-5 text-slate-200" />
                    </div>
                    <p className="text-sm font-normal text-slate-400">O texto processado aparecerá aqui</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </MainContent>
    </div>
  )
}