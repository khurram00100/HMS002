"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

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

const scheduleData = [
  { time: "09:00 AM", monday: "Math", tuesday: "English", wednesday: "Science", thursday: "History", friday: "Art" },
  { time: "10:00 AM", monday: "English", tuesday: "Science", wednesday: "Math", thursday: "Art", friday: "History" },
  { time: "11:00 AM", monday: "Science", tuesday: "History", wednesday: "Art", thursday: "Math", friday: "English" },
  { time: "12:00 PM", monday: "Lunch", tuesday: "Lunch", wednesday: "Lunch", thursday: "Lunch", friday: "Lunch" },
  { time: "01:00 PM", monday: "History", tuesday: "Art", wednesday: "English", thursday: "Science", friday: "Math" },
  { time: "02:00 PM", monday: "Art", tuesday: "Math", wednesday: "History", thursday: "English", friday: "Science" },
]

export default function Schedule() {
  return (
    <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
      <h1 className="text-3xl font-bold">Class Schedule</h1>
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Weekly Timetable</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Monday</TableHead>
                  <TableHead>Tuesday</TableHead>
                  <TableHead>Wednesday</TableHead>
                  <TableHead>Thursday</TableHead>
                  <TableHead>Friday</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scheduleData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.time}</TableCell>
                    <TableCell>{row.monday}</TableCell>
                    <TableCell>{row.tuesday}</TableCell>
                    <TableCell>{row.wednesday}</TableCell>
                    <TableCell>{row.thursday}</TableCell>
                    <TableCell>{row.friday}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

