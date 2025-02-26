"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js"
import { FiUsers, FiBookOpen, FiCalendar, FiDollarSign, FiBell } from "react-icons/fi"
import { Button } from "@/components/ui/button"
import StudentAchievements from "@/components/StudentAchievements"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
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

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const attendanceData = {
    labels: ["Present", "Absent"],
    datasets: [
      {
        data: [85, 15],
        backgroundColor: ["#10B981", "#EF4444"],
        hoverBackgroundColor: ["#059669", "#DC2626"],
      },
    ],
  }

  const performanceData = {
    labels: ["Math", "Science", "English", "History", "Art"],
    datasets: [
      {
        label: "Average Grade",
        data: [75, 82, 78, 85, 90],
        backgroundColor: "#3B82F6",
      },
    ],
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  const handleEmergencyAlert = () => {
    alert("Emergency alert sent to all staff and students!")
  }

  return (
    <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="space-x-2">
          <Button
            variant={activeTab === "overview" ? "default" : "outline"}
            onClick={() => handleTabChange("overview")}
          >
            Overview
          </Button>
          <Button
            variant={activeTab === "performance" ? "default" : "outline"}
            onClick={() => handleTabChange("performance")}
          >
            Performance
          </Button>
        </div>
      </div>

      {!isOnline && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4"
          role="alert"
        >
          <p className="font-bold">You are currently offline.</p>
          <p>Some features may be limited. We'll sync your changes when you're back online.</p>
        </motion.div>
      )}

      {activeTab === "overview" && (
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <motion.div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4" variants={containerVariants}>
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                  <FiUsers className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,234</div>
                  <p className="text-xs text-muted-foreground">+20% from last month</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
                  <FiCalendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">85%</div>
                  <p className="text-xs text-muted-foreground">-2% from last week</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                  <FiBookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">56</div>
                  <p className="text-xs text-muted-foreground">+3 new courses added</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <FiDollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$245,678</div>
                  <p className="text-xs text-muted-foreground">+10% from last year</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
          <motion.div className="grid gap-6 md:grid-cols-2 mt-6" variants={containerVariants}>
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <Doughnut data={attendanceData} />
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>New student enrolled: Jane Doe</li>
                    <li>Upcoming exam: Mathematics (Grade 10)</li>
                    <li>Parent-Teacher meeting scheduled for next week</li>
                    <li>New course added: Introduction to Robotics</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      {activeTab === "performance" && (
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Subject Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <Bar data={performanceData} />
              </CardContent>
            </Card>
          </motion.div>
          <motion.div className="grid gap-6 md:grid-cols-2 mt-6" variants={containerVariants}>
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Students</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>1. John Smith - 95%</li>
                    <li>2. Emma Johnson - 93%</li>
                    <li>3. Michael Brown - 91%</li>
                    <li>4. Sophia Lee - 90%</li>
                    <li>5. William Davis - 89%</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Subjects Needing Improvement</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>1. Physics - 68% average</li>
                    <li>2. Chemistry - 72% average</li>
                    <li>3. Calculus - 75% average</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      <motion.div variants={itemVariants} className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>School Highlights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Image
                src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
                alt="School building"
                width={300}
                height={200}
                className="rounded-lg"
              />
              <Image
                src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Students in classroom"
                width={300}
                height={200}
                className="rounded-lg"
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <StudentAchievements />

      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FiBell className="mr-2" />
              Emergency Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="destructive" className="w-full" onClick={handleEmergencyAlert}>
              Send Emergency Alert
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

