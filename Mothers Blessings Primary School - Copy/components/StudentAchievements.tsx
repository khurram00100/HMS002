"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FiAward, FiPlus } from "react-icons/fi"

interface Achievement {
  id: number
  title: string
  description: string
  date: string
}

export default function StudentAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: 1, title: "First Place in Science Fair", description: "Project on Renewable Energy", date: "2023-05-15" },
    { id: 2, title: "Basketball Team Captain", description: "Led team to regional finals", date: "2023-06-20" },
  ])
  const [newAchievement, setNewAchievement] = useState({ title: "", description: "", date: "" })

  const addAchievement = () => {
    if (newAchievement.title && newAchievement.description && newAchievement.date) {
      setAchievements([...achievements, { id: achievements.length + 1, ...newAchievement }])
      setNewAchievement({ title: "", description: "", date: "" })
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FiAward className="mr-2" />
            Student Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {achievements.map((achievement) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="font-semibold">{achievement.title}</h3>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
                <p className="text-xs text-muted-foreground">{achievement.date}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-4 space-y-2">
            <Label htmlFor="title">New Achievement</Label>
            <Input
              id="title"
              placeholder="Title"
              value={newAchievement.title}
              onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })}
            />
            <Input
              placeholder="Description"
              value={newAchievement.description}
              onChange={(e) => setNewAchievement({ ...newAchievement, description: e.target.value })}
            />
            <Input
              type="date"
              value={newAchievement.date}
              onChange={(e) => setNewAchievement({ ...newAchievement, date: e.target.value })}
            />
            <Button onClick={addAchievement} className="w-full">
              <FiPlus className="mr-2" /> Add Achievement
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

