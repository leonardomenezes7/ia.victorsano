import { useEffect, useRef } from "react"
import { ChatBubble } from "./bubble"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
}

type MessageListProps = {
  messages: Message[]
}

export function MessageList({ messages }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex flex-col gap-4">
      {messages.map(message => (
        <ChatBubble
          key={message.id}
          role={message.role}
          content={message.content}
        />
      ))}
      <div ref={bottomRef} />
    </div>
  )
}