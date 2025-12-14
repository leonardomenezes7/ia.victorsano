type ChatBubbleProps = {
  role: "user" | "assistant"
  content: string
}

export function ChatBubble({ role, content }: ChatBubbleProps) {
  const isUser = role === "user"
  
  const paragraphs = content.split(/\n\s*\n/)
  const isLoading = !isUser && content.trim().length === 0

  if (isLoading) {
    return (
      <div className="flex w-full justify-start">
        <div className="h-4 w-4 rounded-full bg-slate-400 animate-pulse ml-2" />
      </div>
    )
  }

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap
          ${
            isUser
              ? "bg-slate-900 text-white rounded-br-sm"
              : "bg-slate-100 text-slate-900 rounded-bl-sm"
          }`}
      >
        {paragraphs.map((paragraph, index) => {
          if (/^[-–]\s+/m.test(paragraph)) {
            const items = paragraph.split(/\n/)

            return (
              <ul key={index} className="list-disc pl-5 space-y-1">
                {items.map((item, i) => (
                  <li key={i}>{item.replace(/^[-–]\s*/, "")}</li>
                ))}
              </ul>
            )
          }

          return (
            <p key={index} className="mb-2 last:mb-0">
              {paragraph}
            </p>
          )
        })}
      </div>
    </div>
  )
}