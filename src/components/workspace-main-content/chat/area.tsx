import { useEffect, useState } from "react"
import { MessageList } from "./message-list"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
}

type ChatAreaProps = {
  messages: Message[]
}

export function ChatArea({ messages }: ChatAreaProps) {
  const fullText = "Bem vindo Dr. Como posso te ajudar hoje?"
  const [typedText, setTypedText] = useState("")

  useEffect(() => {
    if (messages.length > 0) return

    let index = 0
    setTypedText("")

    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, index + 1))
      index++

      if (index >= fullText.length) {
        clearInterval(interval)
      }
    }, 40)

    return () => clearInterval(interval)
  }, [messages])

  return (
    <section className="flex-1 w-full min-h-0">
      <div className="h-full w-full rounded-2xl border border-slate-200 bg-white flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto px-2 py-2 sm:px-6 sm:py-4">
          {messages.length === 0 ? (
            <div className="w-full pt-3 pl-3 sm:pt-6 sm:pl-6">
              <h1 className="text-xl sm:text-3xl font-light text-slate-900">
                {typedText}
              </h1>
            </div>
          ) : (
            <MessageList messages={messages} />
          )}
        </div>
      </div>
    </section>
  )
}