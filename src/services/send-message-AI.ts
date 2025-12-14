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
    alert("Failed to fetch AI response")
  }

  return response.json()
}