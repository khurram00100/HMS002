"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import {
  FiUser,
  FiLock,
  FiSettings,
  FiBook,
  FiCalendar,
  FiDollarSign,
  FiBookOpen,
  FiBus,
  FiCpu,
  FiCode,
} from "react-icons/fi"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general")

  const menuItems = [
    { id: "general", icon: FiSettings, label: "General" },
    { id: "user-management", icon: FiUser, label: "User Management" },
    { id: "security", icon: FiLock, label: "Security & Privacy" },
    { id: "academic", icon: FiBook, label: "Academic & Exam" },
    { id: "attendance", icon: FiCalendar, label: "Attendance & Leave" },
    { id: "fee", icon: FiDollarSign, label: "Fee & Payment" },
    { id: "library", icon: FiBookOpen, label: "Library & Resources" },
    { id: "transport", icon: FiBus, label: "Transport & Hostel" },
    { id: "ai", icon: FiCpu, label: "AI & Automation" },
    { id: "advanced", icon: FiCode, label: "Advanced & API" },
  ]

  return (
    <motion.div className="flex space-x-6" variants={containerVariants} initial="hidden" animate="visible">
      <div className="w-64 space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant={activeTab === item.id ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab(item.id)}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.label}
          </Button>
        ))}
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        {activeTab === "general" && <GeneralSettings />}
        {activeTab === "user-management" && <UserManagementSettings />}
        {activeTab === "security" && <SecuritySettings />}
        {activeTab === "academic" && <AcademicSettings />}
        {activeTab === "attendance" && <AttendanceSettings />}
        {activeTab === "fee" && <FeeSettings />}
        {activeTab === "library" && <LibrarySettings />}
        {activeTab === "transport" && <TransportSettings />}
        {activeTab === "ai" && <AISettings />}
        {activeTab === "advanced" && <AdvancedSettings />}
      </div>
    </motion.div>
  )
}

function GeneralSettings() {
  return (
    <motion.div variants={itemVariants} className="space-y-6">
      <Card>
        <CardContent className="space-y-4 pt-6">
          <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue="John Doe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="john@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" defaultValue="+1 (555) 123-4567" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Select defaultValue="en">
              <SelectTrigger id="language">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="space-y-4 pt-6">
          <h2 className="text-2xl font-semibold mb-4">Theme & UI</h2>
          <div className="flex items-center justify-between">
            <Label htmlFor="dark-mode">Dark Mode</Label>
            <Switch id="dark-mode" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="font-size">Font Size</Label>
            <Slider id="font-size" defaultValue={[16]} max={24} min={12} step={1} />
          </div>
          <Button>Apply Changes</Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function UserManagementSettings() {
  return (
    <motion.div variants={itemVariants} className="space-y-6">
      <Card>
        <CardContent className="space-y-4 pt-6">
          <h2 className="text-2xl font-semibold mb-4">Role-Based Access Control</h2>
          <div className="space-y-2">
            <Label htmlFor="role">Select Role</Label>
            <Select defaultValue="student">
              <SelectTrigger id="role">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="teacher">Teacher</SelectItem>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="parent">Parent</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button>Manage Permissions</Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function SecuritySettings() {
  return (
    <motion.div variants={itemVariants} className="space-y-6">
      <Card>
        <CardContent className="space-y-4 pt-6">
          <h2 className="text-2xl font-semibold mb-4">Login & Authentication</h2>
          <div className="flex items-center justify-between">
            <Label htmlFor="2fa">Enable Two-Factor Authentication</Label>
            <Switch id="2fa" />
          </div>
          <Button>Change Password</Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function AcademicSettings() {
  return (
    <motion.div variants={itemVariants} className="space-y-6">
      <Card>
        <CardContent className="space-y-4 pt-6">
          <h2 className="text-2xl font-semibold mb-4">Exam & Grading System</h2>
          <div className="space-y-2">
            <Label htmlFor="grading-scale">Grading Scale</Label>
            <Select defaultValue="percentage">
              <SelectTrigger id="grading-scale">
                <SelectValue placeholder="Select Grading Scale" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="percentage">Percentage</SelectItem>
                <SelectItem value="gpa">GPA</SelectItem>
                <SelectItem value="letter">Letter Grades</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button>Apply Changes</Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function AttendanceSettings() {
  return (
    <motion.div variants={itemVariants} className="space-y-6">
      <Card>
        <CardContent className="space-y-4 pt-6">
          <h2 className="text-2xl font-semibold mb-4">Attendance Mode</h2>
          <div className="space-y-2">
            <Label htmlFor="attendance-mode">Select Attendance Mode</Label>
            <Select defaultValue="manual">
              <SelectTrigger id="attendance-mode">
                <SelectValue placeholder="Select Attendance Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manual">Manual</SelectItem>
                <SelectItem value="rfid">RFID</SelectItem>
                <SelectItem value="biometric">Biometric</SelectItem>
                <SelectItem value="qr">QR Code</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function FeeSettings() {
  return (
    <motion.div variants={itemVariants} className="space-y-6">
      <Card>
        <CardContent className="space-y-4 pt-6">
          <h2 className="text-2xl font-semibold mb-4">Payment Methods</h2>
          <div className="flex items-center justify-between">
            <Label htmlFor="online-payments">Enable Online Payments</Label>
            <Switch id="online-payments" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="payment-gateway">Select Payment Gateway</Label>
            <Select defaultValue="stripe">
              <SelectTrigger id="payment-gateway">
                <SelectValue placeholder="Select Payment Gateway" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stripe">Stripe</SelectItem>
                <SelectItem value="razorpay">Razorpay</SelectItem>
                <SelectItem value="paypal">PayPal</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function LibrarySettings() {
  return (
    <motion.div variants={itemVariants} className="space-y-6">
      <Card>
        <CardContent className="space-y-4 pt-6">
          <h2 className="text-2xl font-semibold mb-4">Book Borrowing Rules</h2>
          <div className="space-y-2">
            <Label htmlFor="max-books">Maximum Books Per Student</Label>
            <Input id="max-books" type="number" defaultValue="3" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="auto-fine">Enable Auto-Fine Calculation</Label>
            <Switch id="auto-fine" />
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function TransportSettings() {
  return (
    <motion.div variants={itemVariants} className="space-y-6">
      <Card>
        <CardContent className="space-y-4 pt-6">
          <h2 className="text-2xl font-semibold mb-4">School Bus Tracking</h2>
          <div className="flex items-center justify-between">
            <Label htmlFor="gps-tracking">Enable GPS Tracking</Label>
            <Switch id="gps-tracking" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="bus-notifications">Bus Arrival Notifications</Label>
            <Switch id="bus-notifications" />
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function AISettings() {
  return (
    <motion.div variants={itemVariants} className="space-y-6">
      <Card>
        <CardContent className="space-y-4 pt-6">
          <h2 className="text-2xl font-semibold mb-4">AI Features</h2>
          <div className="flex items-center justify-between">
            <Label htmlFor="ai-predictions">Enable AI-Based Performance Predictions</Label>
            <Switch id="ai-predictions" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="ai-chatbot">Enable AI Chatbot for Queries</Label>
            <Switch id="ai-chatbot" />
          </div>
          <Button>Apply Changes</Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function AdvancedSettings() {
  return (
    <motion.div variants={itemVariants} className="space-y-6">
      <Card>
        <CardContent className="space-y-4 pt-6">
          <h2 className="text-2xl font-semibold mb-4">Third-Party Integrations</h2>
          <div className="flex items-center justify-between">
            <Label htmlFor="google-drive">Google Drive Integration</Label>
            <Switch id="google-drive" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="zoom">Zoom Integration</Label>
            <Switch id="zoom" />
          </div>
          <Button>Manage Integrations</Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

