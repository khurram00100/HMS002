"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FiMessageSquare, FiX, FiMic, FiSend } from "react-icons/fi"
import "regenerator-runtime/runtime"
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition"

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([])
  const [input, setInput] = useState("")
  const [isListening, setIsListening] = useState(false)

  // Speech recognition
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition()

  useEffect(() => {
    if (transcript) {
      setInput(transcript)
    }
  }, [transcript])

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = input.trim()
      setMessages([...messages, { text: userMessage, isUser: true }])
      setInput("")

      // AI Response Simulation (Replace with actual API)
      setTimeout(() => {
        let botResponse = "I'm here to help! What do you need?"

        if (userMessage.toLowerCase().includes("attendance")) {
          botResponse = "Your attendance is 95% this month. Keep up the good work!"
        } else if (userMessage.toLowerCase().includes("exam")) {
          botResponse = "Your next exam is Mathematics on March 5, 2025."
        } else if (userMessage.toLowerCase().includes("fee")) {
          botResponse = "Your outstanding fee is $500. The last date for payment is March 10."
        }

        setMessages((prev) => [...prev, { text: botResponse, isUser: false }])
      }, 1000)
    }
  }

  const handleVoiceInput = () => {
    if (!browserSupportsSpeechRecognition) {
      alert("Your browser does not support voice recognition.")
      return
    }
    if (listening) {
      SpeechRecognition.stopListening()
      setIsListening(false)
      handleSend()
    } else {
      SpeechRecognition.startListening({ continuous: true, language: "en-US" })
      setIsListening(true)
    }
  }

  return (
    <>
      <Button className="fixed bottom-4 right-4 rounded-full p-4 shadow-lg" onClick={() => setIsOpen(true)}>
        <FiMessageSquare size={24} />
      </Button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-20 right-4 w-80"
          >
            <Card className="shadow-xl rounded-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>📚 AI School Assistant</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <FiX />
                </Button>
              </CardHeader>
              <CardContent className="h-80 overflow-y-auto space-y-4 bg-gray-100 dark:bg-gray-800 p-2">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] p-2 rounded-lg ${
                        message.isUser
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 dark:bg-gray-600 text-black dark:text-white"
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
              </CardContent>
              <div className="p-4 border-t flex">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  className="flex-grow"
                />
                <Button onClick={handleSend} className="ml-2">
                  <FiSend />
                </Button>
                {browserSupportsSpeechRecognition && (
                  <Button onClick={handleVoiceInput} className="ml-2">
                    <FiMic className={isListening ? "text-red-500 animate-pulse" : ""} />
                  </Button>
                )}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

