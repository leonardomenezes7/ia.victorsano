import { useState } from "react"
import { sendMessageToAI } from "@/services/send-message-AI"

export interface Message {
  role: "user" | "assistant"
  content: string
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  async function sendMessage(text: string) {
    if (!text.trim()) return

    // 1. Adiciona mensagem do usuário
    const newMessages = [
      ...messages,
      { role: "user", content: text } as Message
    ]
    setMessages(newMessages)
    setIsLoading(true)

    try {
      // 2. Envia para a IA
      const response = await sendMessageToAI(text)
      
      // 3. Adiciona resposta da IA
      if (response) {
        setMessages([
          ...newMessages,
          { role: "assistant", content: response } as Message
        ])
      }
    } catch (error) {
      console.error(error)
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Desculpe, ocorreu um erro ao processar sua mensagem." } as Message
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return {
    messages,
    sendMessage,
    isLoading // Exportamos o estado de carregamento
  }
}