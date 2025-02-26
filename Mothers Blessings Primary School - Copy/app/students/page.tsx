"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Student {
  id: number
  name: string
  grade: string
  email: string
}

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

export default function Students() {
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: "John Doe", grade: "10th", email: "john@example.com" },
    { id: 2, name: "Jane Smith", grade: "11th", email: "jane@example.com" },
    { id: 3, name: "Bob Johnson", grade: "9th", email: "bob@example.com" },
  ])
  const [newStudent, setNewStudent] = useState({ name: "", grade: "", email: "" })

  const addStudent = () => {
    if (newStudent.name && newStudent.grade && newStudent.email) {
      setStudents([...students, { id: students.length + 1, ...newStudent }])
      setNewStudent({ name: "", grade: "", email: "" })
    }
  }

  return (
    <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
      <h1 className="text-3xl font-bold">Students</h1>
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Add New Student</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Input
                placeholder="Student Name"
                value={newStudent.name}
                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
              />
              <Input
                placeholder="Grade"
                value={newStudent.grade}
                onChange={(e) => setNewStudent({ ...newStudent, grade: e.target.value })}
              />
              <Input
                placeholder="Email"
                type="email"
                value={newStudent.email}
                onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
              />
              <Button onClick={addStudent}>Add Student</Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Student List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Email</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.id}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.grade}</TableCell>
                    <TableCell>{student.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Student Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Image
                src="/placeholder.svg?height=200&width=300"
                alt="Students in library"
                width={300}
                height={200}
                className="rounded-lg"
              />
              <Image
                src="/placeholder.svg?height=200&width=300"
                alt="Students in sports"
                width={300}
                height={200}
                className="rounded-lg"
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

