export async function sendMessageToAI(text: string) {
  const response = await fetch("https://n8n.victorsano.com/webhook/d13f7bc4-e3d0-487a-b078-4b0249d842cd", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: text,
    }),
  })

  if (!response.ok) {
    console.error("Failed to fetch AI response")
    return "Erro ao conectar com a IA."
  }

  const data = await response.json()

  // CORREÇÃO:
  // O erro "found: object with keys {reply}" indica que o texto está dentro de data.reply
  // Retornamos apenas a string, não o objeto inteiro.
  return data.reply || data.output || data.message || "Resposta sem conteúdo de texto."
}