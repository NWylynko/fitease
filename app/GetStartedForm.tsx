"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useStoreAddMessage, useStoreSetUser } from "./store"
import { useRouter } from "next/navigation"

const schema = z.object({
  name: z.string().min(2).max(50),
  age: z.enum(["15-25", "26-35", "36-45", "46-55", "56+"]),
  height: z.enum(["140-155", "156-170", "171-185", "186-200", "200+"]),
  weight: z.enum(["40-60", "61-80", "81-100", "101-120", "120+"]),
  goalWeight: z.number().min(10).max(200),
  timeline: z.enum(["4-8", "9-12", "13-16", "17-20", "20+"]),
})


export const GetStartedForm = () => {
  const setUser = useStoreSetUser()
  const addMessage = useStoreAddMessage()
  const router = useRouter()

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })

  const handleSubmit = form.handleSubmit(async (data) => {
    setUser({
      ...data,
      bmi: calculateBMI(data.weight, data.height)
    })
    addMessage({
      id: 0,
      text: `Hello ${data.name}, I am Brad Pitt, how are you going?`,
      sender: 'bot',
      avatar: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Brad_Pitt_Cannes.jpg'
    })
    router.push("/chat")
  })

  return (
    <Form {...form}>
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>

        <FormField
          control={form.control}
          name="name"
          defaultValue=""
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input className="text-[16px]" placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="age"
          defaultValue={undefined}
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel>Age</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue className="text-[16px]" placeholder="Select your age range" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="15-25">15-25 years</SelectItem>
                  <SelectItem value="26-35">26-35 years</SelectItem>
                  <SelectItem value="36-45">36-45 years</SelectItem>
                  <SelectItem value="46-55">46-55 years</SelectItem>
                  <SelectItem value="56+">56+ years</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="height"
          defaultValue={undefined}
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel>Height</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue className="text-[16px]" placeholder="Select your height range" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="140-155">140-155 cm</SelectItem>
                  <SelectItem value="156-170">156-170 cm</SelectItem>
                  <SelectItem value="171-185">171-185 cm</SelectItem>
                  <SelectItem value="186-200">186-200 cm</SelectItem>
                  <SelectItem value="200+">200+ cm</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="weight"
          defaultValue={undefined}
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel>Weight</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue className="text-[16px]" placeholder="Select your weight range" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="40-60">40-60 kg</SelectItem>
                  <SelectItem value="61-80">61-80 kg</SelectItem>
                  <SelectItem value="81-100">81-100 kg</SelectItem>
                  <SelectItem value="101-120">101-120 kg</SelectItem>
                  <SelectItem value="120+">120+ kg</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem className="flex flex-col items-start">
          <FormLabel>BMI</FormLabel>
          <FormControl>
            <Input className="text-[16px]" disabled value={calculateBMI(form.watch("weight"), form.watch("height"))} />
          </FormControl>
        </FormItem>

        <FormField
          control={form.control}
          name="goalWeight"
          defaultValue={undefined}
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel>Goal Weight (kg)</FormLabel>
              <FormControl>
                <Input className="text-[16px]" placeholder="Enter your goal weight" type="number" step="0.1" {...field} value={field.value ? field.value.toString() : ""} onChange={(e) => field.onChange(e.target.valueAsNumber)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="timeline"
          defaultValue={undefined}
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel>Timeline to Reach Goal (weeks)</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue className="text-[16px]" placeholder="Select your timeline" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="4-8">4-8 weeks</SelectItem>
                  <SelectItem value="9-12">9-12 weeks</SelectItem>
                  <SelectItem value="13-16">13-16 weeks</SelectItem>
                  <SelectItem value="17-20">17-20 weeks</SelectItem>
                  <SelectItem value="20+">20+ weeks</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full">Start chat with Companion</Button>
      </form>
    </Form>
  )
}

const calculateBMI = (weight: z.infer<typeof schema>["weight"], height: z.infer<typeof schema>["height"]) => {
  if (weight === undefined || weight === null) return ""
  if (height === undefined || height === null) return ""

  const heightRange = height.split("-")
  const weightRange = weight.split("-")

  if (heightRange.length === 2 && weightRange.length === 2) {
    const heightMin = Number(heightRange[0]) / 100
    const heightMax = Number(heightRange[1]) / 100
    const weightMin = Number(weightRange[0]) / 100
    const weightMax = Number(weightRange[1]) / 100

    const bmiMin = Math.floor((weightMin / (heightMin * heightMin)) * 100)
    const bmiMax = Math.floor((weightMax / (heightMax * heightMax)) * 100)

    return `${bmiMin} - ${bmiMax}`
  }
  if (heightRange.length === 2 && weightRange.length === 1) {
    const heightMin = Number(heightRange[0]) / 100
    const heightMax = Number(heightRange[1]) / 100
    const weight = Number(weightRange[0].replace("+", "")) / 100

    const bmiMin = Math.floor((weight / (heightMin * heightMin)) * 100)
    const bmiMax = Math.floor((weight / (heightMax * heightMax)) * 100)

    return `${bmiMin} - ${bmiMax}`
  }
  if (heightRange.length === 1 && weightRange.length === 2) {
    const height = Number(heightRange[0].replace("+", "")) / 100
    const weightMin = Number(weightRange[0]) / 100
    const weightMax = Number(weightRange[1]) / 100

    const bmiMin = Math.floor((weightMin / (height * height)) * 100)
    const bmiMax = Math.floor((weightMax / (height * height)) * 100)

    return `${bmiMin} - ${bmiMax}`
  }
  if (heightRange.length === 1 && weightRange.length === 1) {
    const height = Number(heightRange[0].replace("+", "")) / 100
    const weight = Number(weightRange[0].replace("+", "")) / 100

    const bmi = Math.floor((weight / (height * height)) * 100)

    return `${bmi}+`
  }
  return ""
}