import { Sidebar } from "@/components/sidebar"
import { ChatArea } from "@/components/workspace-main-content/chat/area"
import { DictationArea } from "@/components/workspace-main-content/dictation-area"
import { MainContent } from "@/components/workspace-main-content/main-content"
import { PromptArea } from "@/components/workspace-main-content/prompt-area"
import { useChat } from "@/hooks/use-chat"

export function Workspace() {
  const {
    messages,
    sendMessage,
    addAssistantMessage,
    addUserMessage
  } = useChat()

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-gray-100">
      <Sidebar />

      <MainContent>
        <ChatArea messages={messages} />

        <PromptArea onSend={sendMessage} />

        <DictationArea
          onAssistantResponse={(text) => {
            addAssistantMessage("")
            addAssistantMessage(text)
          }}
          onUserMessage={(text) => {
            addUserMessage(text)
          }}
        />
      </MainContent>
    </div>
  )
}