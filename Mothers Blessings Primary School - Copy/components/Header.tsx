"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { FiMoon, FiSun, FiUser, FiLogOut, FiMic } from "react-icons/fi"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { motion } from "framer-motion"

export default function Header() {
  const { theme, setTheme } = useTheme()
  const [user, setUser] = useState({ name: "John Doe", role: "Admin" })
  const [isListening, setIsListening] = useState(false)

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    setTheme(darkModeMediaQuery.matches ? "dark" : "light")

    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light")
    }

    darkModeMediaQuery.addEventListener("change", handleChange)
    return () => darkModeMediaQuery.removeEventListener("change", handleChange)
  }, [setTheme])

  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logging out...")
  }

  const handleVoiceAssistant = () => {
    setIsListening(!isListening)
    // Implement voice assistant logic here
    console.log("Voice assistant activated")
  }

  return (
    <motion.header
      className="bg-background border-b p-4 flex justify-between items-center"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Link href="/">
        <h1 className="text-2xl font-bold cursor-pointer">Mother's Blessings High School</h1>
      </Link>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          {theme === "light" ? <FiMoon /> : <FiSun />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleVoiceAssistant}
          className={isListening ? "bg-primary text-primary-foreground" : ""}
        >
          <FiMic />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/01.png" alt={user.name} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuItem className="flex flex-col items-start">
              <div className="font-medium">{user.name}</div>
              <div className="text-xs text-muted-foreground">{user.role}</div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FiUser className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <FiLogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.header>
  )
}

