import { useRef, useState } from "react"

export function useAudio() {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const streamRef = useRef<MediaStream | null>(null)

  const [isRecording, setIsRecording] = useState(false)

  async function startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    streamRef.current = stream

    const recorder = new MediaRecorder(stream, {
      mimeType: "audio/webm"
    })

    chunksRef.current = []
    mediaRecorderRef.current = recorder

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data)
      }
    }

    recorder.start()
    setIsRecording(true)
  }

  async function stopRecording(): Promise<File> {
    return new Promise((resolve) => {
      const recorder = mediaRecorderRef.current
      if (!recorder) return

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" })
        const file = new File([blob], "dictation.webm", {
          type: "audio/webm"
        })

        // encerra o microfone corretamente
        streamRef.current?.getTracks().forEach(track => track.stop())

        setIsRecording(false)
        resolve(file)
      }

      recorder.stop()
    })
  }

  async function sendAudioToN8N(file: File) {
    const base64 = await new Promise<string>((resolve) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        resolve(result.split(",")[1])
      }
      reader.readAsDataURL(file)
    })

    const response = await fetch("https://n8n.victorsano.com/webhook/b36af2a5-4f43-4636-8b5d-cfc3b73e8df2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        filename: file.name,
        mimetype: file.type,
        data: base64
      })
    })

    if (!response.ok) {
      throw new Error("Failed to send audio to n8n")
    }

    return response.json()
  }

  return {
    isRecording,
    startRecording,
    stopRecording,
    sendAudioToN8N
  }
}