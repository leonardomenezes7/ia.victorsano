import { Sidebar } from "@/components/sidebar"
import { ChatArea } from "@/components/workspace-main-content/chat/area"
import { MainContent } from "@/components/workspace-main-content/main-content"
import { PromptArea } from "@/components/workspace-main-content/prompt-area"
import { useChat } from "@/hooks/use-chat"

export function Workspace() {
  const {
    messages,
    sendMessage,
    isLoading // Agora temos acesso a isso
  } = useChat()

  return (
    <div className="h-screen w-screen flex flex-col-reverse md:flex-row overflow-hidden bg-slate-50/50">
      <Sidebar />

      <MainContent>
        {/* Passamos isLoading para exibir a animação na lista */}
        <ChatArea messages={messages} isLoading={isLoading} />

        {/* Passamos isLoading para desabilitar o input durante envio */}
        <PromptArea onSend={sendMessage} isLoading={isLoading} />
      </MainContent>
    </div>
  )
}