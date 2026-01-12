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

    // 1. Cria a mensagem do Usuário
    const userMsg: Message = { role: "user", content: text }
    
    // 2. Cria uma mensagem da IA "vazia" temporária para receber o texto
    const assistantMsg: Message = { role: "assistant", content: "" }
    
    // Atualiza o estado com ambas (a do usuário e a vazia da IA)
    setMessages(prev => [...prev, userMsg, assistantMsg])
    setIsLoading(true)

    try {
      // 3. Chama o serviço passando a função de callback (o segundo argumento)
      await sendMessageToAI(text, (chunk) => {
        
        setMessages(currentMessages => {
          const newMessages = [...currentMessages]
          // Pega a última mensagem (que é a da IA vazia/em construção)
          const lastMsgIndex = newMessages.length - 1
          
          if (lastMsgIndex >= 0) {
             const lastMsg = { ...newMessages[lastMsgIndex] }
             
             // Adiciona o pedacinho de texto que chegou
             lastMsg.content += chunk
             
             newMessages[lastMsgIndex] = lastMsg
          }
          
          return newMessages
        })
      })
      
    } catch (error) {
      console.error(error)
      // Opcional: Adicionar mensagem de erro visual se falhar totalmente
    } finally {
      setIsLoading(false)
    }
  }

  return {
    messages,
    sendMessage,
    isLoading
  }
}