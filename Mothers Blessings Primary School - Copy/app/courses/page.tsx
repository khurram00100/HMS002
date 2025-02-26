"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Course {
  id: number
  name: string
  instructor: string
  credits: number
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

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: "Mathematics", instructor: "Dr. Smith", credits: 3 },
    { id: 2, name: "English Literature", instructor: "Prof. Johnson", credits: 4 },
    { id: 3, name: "Physics", instructor: "Dr. Brown", credits: 3 },
  ])
  const [newCourse, setNewCourse] = useState({ name: "", instructor: "", credits: 0 })

  const addCourse = () => {
    if (newCourse.name && newCourse.instructor && newCourse.credits) {
      setCourses([...courses, { id: courses.length + 1, ...newCourse }])
      setNewCourse({ name: "", instructor: "", credits: 0 })
    }
  }

  return (
    <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
      <h1 className="text-3xl font-bold">Courses</h1>
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Add New Course</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Input
                placeholder="Course Name"
                value={newCourse.name}
                onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
              />
              <Input
                placeholder="Instructor"
                value={newCourse.instructor}
                onChange={(e) => setNewCourse({ ...newCourse, instructor: e.target.value })}
              />
              <Input
                placeholder="Credits"
                type="number"
                value={newCourse.credits}
                onChange={(e) => setNewCourse({ ...newCourse, credits: Number(e.target.value) })}
              />
              <Button onClick={addCourse}>Add Course</Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Course List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Instructor</TableHead>
                  <TableHead>Credits</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell>{course.id}</TableCell>
                    <TableCell>{course.name}</TableCell>
                    <TableCell>{course.instructor}</TableCell>
                    <TableCell>{course.credits}</TableCell>
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
            <CardTitle>Featured Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Image
                src="/placeholder.svg?height=200&width=300"
                alt="Science lab"
                width={300}
                height={200}
                className="rounded-lg"
              />
              <Image
                src="/placeholder.svg?height=200&width=300"
                alt="Art studio"
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

