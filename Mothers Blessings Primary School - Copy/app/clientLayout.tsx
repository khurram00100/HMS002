"use client"

import type React from "react"

import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Sidebar from "@/components/Sidebar"
import Header from "@/components/Header"
import Chatbot from "@/components/Chatbot"
import LanguageSelector from "@/components/LanguageSelector"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const inter = Inter({ subsets: ["latin"] })

export default function ClientRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="relative flex h-screen bg-background text-foreground overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80"
              alt="School background"
              fill
              style={{ objectFit: "cover", opacity: 0.1 }}
            />
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
              <Header />
              <AnimatePresence mode="wait">
                <motion.main
                  key={children?.toString()}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 overflow-y-auto p-4 md:p-8"
                >
                  {children}
                </motion.main>
              </AnimatePresence>
            </div>
          </div>
          <Chatbot />
          <LanguageSelector />
        </ThemeProvider>
      </body>
    </html>
  )
}

