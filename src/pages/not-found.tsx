import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { FileQuestion, ArrowLeft } from "lucide-react"

export function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-50/50 p-4">
      <div className="flex flex-col items-center text-center max-w-md gap-8">
        
        {/* Ícone Decorativo */}
        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-white shadow-sm border border-slate-100">
          <FileQuestion className="h-12 w-12 text-slate-300" />
        </div>

        {/* Mensagem */}
        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-normal text-slate-900 tracking-tight">
            Página não encontrada
          </h1>
          <p className="text-slate-500 font-light leading-relaxed">
            O endereço que você tentou acessar não existe ou foi movido.
          </p>
        </div>

        {/* Ações */}
        <div className="flex gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)} // Volta para a página anterior
            className="rounded-full px-6 h-10 bg-white border-slate-200 text-slate-700 hover:bg-slate-50 font-normal"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
          </Button>

          <Button 
            onClick={() => navigate("/")} 
            className="rounded-full px-6 h-10 bg-slate-900 hover:bg-slate-800 text-white font-normal"
          >
            Ir para o Início
          </Button>
        </div>

      </div>
    </div>
  )
}