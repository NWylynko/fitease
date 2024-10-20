"use client"

import { useEffect, useState } from 'react'
import { Loader2Icon, Send } from 'lucide-react'
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
import { useStoreAddMessage, useStoreMessages, useStoreUpdateVideoGenToVideo, useStoreUpdateTextGenToText } from '../store'
import { getTextStatus, getVideoStatus, startVideoGen, submitMessage } from './actions'

const FormSchema = z.object({
  message: z.string(),
})

export default function Component() {
  const messages = useStoreMessages()
  const addMessage = useStoreAddMessage();
  const updateVideoGenToVideo = useStoreUpdateVideoGenToVideo();
  const updateTextGenToText = useStoreUpdateTextGenToText();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      message: "",
    },
  })

  const handleSubmit = form.handleSubmit(async (data) => {
    if (data.message.trim() !== '') {
      addMessage({
        id: messages.length + 1,
        content: data.message,
        sender: 'user',
        type: 'text',
        avatar: 'https://discoverymood.com/wp-content/uploads/2020/04/Mental-Strong-Women-min-480x340.jpg'
      })
      form.reset()

      const response = await submitMessage(data.message)

      addMessage({
        id: messages.length + 2,
        content: response.requestId,
        sender: 'bot',
        type: 'text-gen',
        avatar: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Brad_Pitt_Cannes.jpg'
      })

      // const new_video_gen = await startVideoGen(response.text)

      // addMessage({
      //   id: messages.length + 3,
      //   content: new_video_gen.videoId,
      //   sender: 'bot',
      //   type: 'video-gen',
      //   avatar: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Brad_Pitt_Cannes.jpg'
      // })

    }
  })

  useEffect(() => {
    const interval = setInterval(async () => {
      console.log("messages", messages)

      const genTextMessages = messages.filter((message) => message.type === 'text-gen')

      console.log(genTextMessages)

      for await (const message of genTextMessages) {
        const video = await getTextStatus(message.content)

        if (video.completed === true) {
          updateTextGenToText(message.id, video.data)

          const new_video_gen = await startVideoGen(video.data)

          addMessage({
            id: messages.length + 3,
            content: new_video_gen.videoId,
            sender: 'bot',
            type: 'video-gen',
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Brad_Pitt_Cannes.jpg'
          })

        }
      }
    }, 5 * 1000)

    return () => clearInterval(interval)
  }, [messages])

  useEffect(() => {
    const interval = setInterval(async () => {
      console.log("messages", messages)

      const genVideoMessages = messages.filter((message) => message.type === 'video-gen')

      console.log(genVideoMessages)

      for await (const message of genVideoMessages) {
        const video = await getVideoStatus(message.content)

        if (video.status === 'completed') {
          updateVideoGenToVideo(message.id, video.videoUrl)
        }
      }
    }, 5 * 1000)

    return () => clearInterval(interval)
  }, [messages])



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
              {message.type === 'text' ? <div
                className={`max-w-[70%] rounded-lg p-3 ${message.sender === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted'
                  }`}
              >
                {message.content}
              </div> : null}
              {message.type === 'text-gen' ? <div className={`max-w-[70%] rounded-lg p-3 ${message.sender === 'user'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted'
                }`}>
                <span className="flex flex-row gap-2 items-center">Generating Response <Loader2Icon className="size-4 animate-spin" /></span>
              </div> : null}
              {message.type === 'video-gen' ? <div className={`max-w-[70%] rounded-lg p-3 ${message.sender === 'user'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted'
                }`}>
                <span className="flex flex-row gap-2 items-center">Generating Video <Loader2Icon className="size-4 animate-spin" /></span>
              </div> : null}
              {message.type === 'video' ? <div className={`max-w-[70%] rounded-lg p-3 ${message.sender === 'user'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted'
                }`}>
                <video src={message.content} controls className="w-full h-auto" />
              </div> : null}
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