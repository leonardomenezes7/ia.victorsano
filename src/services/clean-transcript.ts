export async function cleanTranscriptWithAI(rawText: string) {
  // Substitua pela URL do seu novo Webhook no n8n focado em limpar texto
  const WEBHOOK_URL = "https://n8n.victorsano.com/webhook/b36af2a5-4f43-4636-8b5d-cfc3b73e8df2"

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: rawText,
      }),
    })

    if (!response.ok) {
      throw new Error("Erro ao conectar com a IA")
    }

    const data = await response.json()
    // Assumindo que o n8n retorna { "cleanedText": "..." } ou { "reply": "..." }
    return data.cleanedText || data.reply || "Erro: Formato de resposta inesperado."
  } catch (error) {
    console.error(error)
    return null
  }
}