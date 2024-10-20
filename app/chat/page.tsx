"use client"

import { useState } from 'react'
import { Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useStoreAddMessage, useStoreMessages } from '../store'
import { submitMessage } from './actions'

interface Message {
  id: number
  text: string
  sender: 'user' | 'bot'
  avatar: string
}

const FormSchema = z.object({
  message: z.string(),
})

export default function Component() {
  const messages = useStoreMessages()
  const addMessage = useStoreAddMessage();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      message: "",
    },
  })

  const handleSubmit = form.handleSubmit(async (data) => {
    if (data.message.trim() !== '') {
      const userMessage: Message = {
        id: messages.length + 1,
        text: data.message,
        sender: 'user',
        avatar: 'https://discoverymood.com/wp-content/uploads/2020/04/Mental-Strong-Women-min-480x340.jpg'
      }
      addMessage(userMessage)
      form.reset()

      const response = await submitMessage(data.message)

      addMessage({
        id: messages.length + 2,
        text: response.text,
        sender: 'bot',
        avatar: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Brad_Pitt_Cannes.jpg'
      })


    }
  })

  return (
    <div className="flex flex-col min-h-[85svh] w-full mx-auto overflow-hidden bg-background">
      <ScrollArea className="flex-grow p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-2 ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'
                }`}
            >
              <Avatar>
                <AvatarImage src={message.avatar} alt={`${message.sender} avatar`} className="object-cover" />
                <AvatarFallback>{message.sender[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <div
                className={`max-w-[70%] rounded-lg p-3 ${message.sender === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted'
                  }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <Form {...form}>
          <form
            onSubmit={handleSubmit}
            className="flex flex-row w-full gap-2"
          >
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Type your message..."
                      {...field}
                      className="w-full text-[16px]"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}