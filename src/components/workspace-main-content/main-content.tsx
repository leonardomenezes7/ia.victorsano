type MainContentProps = {
  children: React.ReactNode
}

export function MainContent({ children }: MainContentProps) {
  return (
    <div className="flex-1 min-h-0 flex justify-center pt-4">
      <div className="w-full max-w-5xl px-6 py-8 flex flex-col min-h-0">
        <div className="flex flex-col gap-3 flex-1 min-h-0">
          {children}
        </div>
      </div>
    </div>
  )
}