export async function sendMessageToAI(
  text: string, 
  onChunk: (chunk: string) => void
): Promise<void> {
  try {
    // Substitua pela URL do seu Webhook de Produção do n8n
    const response = await fetch("https://n8n.victorsano.com/webhook/d13f7bc4-e3d0-487a-b078-4b0249d842cd", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: text,
      }),
    })

    if (!response.ok || !response.body) {
      throw new Error("Erro na conexão com a IA")
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let done = false

    while (!done) {
      const { value, done: doneReading } = await reader.read()
      done = doneReading
      
      if (value) {
        const chunkValue = decoder.decode(value, { stream: true })
        
        // Proteção: Só chama se a função existir
        if (typeof onChunk === 'function') {
          onChunk(chunkValue)
        }
      }
    }

  } catch (error) {
    console.error("Erro no stream:", error)
    if (typeof onChunk === 'function') {
      onChunk("\n[Erro de conexão. Tente novamente.]")
    }
  }
}