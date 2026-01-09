import { useState, useEffect, useRef } from "react"

export function useSpeechRecognition() {
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState("")
  
  const recognitionRef = useRef<any>(null)
  // Criamos uma ref para guardar o texto que existia antes da gravação atual começar
  const previousTextRef = useRef("")

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition()
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = "pt-BR"

      recognition.onresult = (event: any) => {
        let currentSessionTranscript = ""
        for (let i = 0; i < event.results.length; i++) {
          currentSessionTranscript += event.results[i][0].transcript
        }
        
        // A mágica acontece aqui:
        // Pegamos o texto antigo (salvo no início) + espaço + o que está sendo dito agora
        const prefix = previousTextRef.current ? previousTextRef.current + " " : ""
        setTranscript(prefix + currentSessionTranscript)
      }

      recognition.onerror = (event: any) => {
        console.error("Erro no reconhecimento de fala:", event.error)
        setIsRecording(false)
      }

      recognition.onend = () => {
        if (isRecording) {
            // Se caiu a conexão mas o estado é gravando, tenta reiniciar (opcional)
             // recognition.start() 
        }
      }

      recognitionRef.current = recognition
    }
  }, []) // O array vazio garante que o setup do recognition só roda uma vez

  function startRecording() {
    if (recognitionRef.current) {
      // 1. Antes de começar, salvamos o que já está escrito no input
      // Isso garante que se você editou o texto manualmente, a gravação continua dali
      previousTextRef.current = transcript
      
      recognitionRef.current.start()
      setIsRecording(true)
    }
  }

  function stopRecording() {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsRecording(false)
    }
  }

  return {
    isRecording,
    transcript,
    startRecording,
    stopRecording,
    setTranscript // Mantemos exportado para permitir edição manual ou limpeza
  }
}