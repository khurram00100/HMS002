"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { FiHome, FiUsers, FiBook, FiCalendar, FiDollarSign, FiSettings } from "react-icons/fi"

const menuItems = [
  { icon: FiHome, name: "Dashboard", href: "/" },
  { icon: FiUsers, name: "Students", href: "/students" },
  { icon: FiBook, name: "Courses", href: "/courses" },
  { icon: FiCalendar, name: "Schedule", href: "/schedule" },
  { icon: FiDollarSign, name: "Finances", href: "/finances" },
  { icon: FiSettings, name: "Settings", href: "/settings" },
]

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <motion.aside
      initial={{ width: 250 }}
      animate={{ width: isCollapsed ? 80 : 250 }}
      className="bg-card text-card-foreground shadow-lg"
    >
      <div className="p-4 flex justify-between items-center">
        <motion.h1 initial={{ opacity: 1 }} animate={{ opacity: isCollapsed ? 0 : 1 }} className="font-bold text-lg">
          MBHS
        </motion.h1>
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-2">
          {isCollapsed ? "→" : "←"}
        </button>
      </div>
      <nav className="mt-8">
        {menuItems.map((item) => (
          <Link key={item.name} href={item.href}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center px-4 py-3 mb-2 transition-colors ${
                pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-accent"
              }`}
            >
              <item.icon className="w-5 h-5 mr-4" />
              {!isCollapsed && <span>{item.name}</span>}
            </motion.div>
          </Link>
        ))}
      </nav>
    </motion.aside>
  )
}

