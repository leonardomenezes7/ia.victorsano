import { useState } from "react"
import { sendMessageToAI } from "@/services/send-message-AI"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([])

  function addMessage(message: Message) {
    setMessages(prev => [...prev, message])
  }

  function addUserMessage(text: string) {
    addMessage({
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    })
  }

  function addAssistantMessage(text: string) {
    addMessage({
      id: crypto.randomUUID(),
      role: "assistant",
      content: text,
    })
  }

  async function sendMessage(text: string) {
    addUserMessage(text)

    const assistantId = crypto.randomUUID()

    addMessage({
      id: assistantId,
      role: "assistant",
      content: "",
    })

    const response = await sendMessageToAI(text)

    const reply = response.reply ?? "I couldn't generate a response."

    await simulateAssistantTyping(assistantId, reply)
  }

  async function simulateAssistantTyping(
    assistantId: string,
    fullText: string
  ) {
    for (let i = 0; i < fullText.length; i++) {
      await new Promise(r => setTimeout(r, 20))

      setMessages(prev =>
        prev.map(msg =>
          msg.id === assistantId
            ? { ...msg, content: fullText.slice(0, i + 1) }
            : msg
        )
      )
    }
  }

  return {
    messages,
    sendMessage,
    addAssistantMessage,
    addUserMessage,
  }
}