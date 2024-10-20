"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

type Store = {
  user: {
    name: string
    age: string
    height: string
    weight: string
    bmi: string
    goalWeight: number
    timeline: string
  } | null,
  messages: {
    id: number
    content: string
    sender: 'user' | 'bot'
    type: 'text' | 'video' | 'video-gen' | 'text-gen'
    avatar: string
  }[],

  setUser: (user: Store['user']) => void
  addMessage: (message: Store['messages'][0]) => void
  updateVideoGenToVideo: (messageId: number, videoUrl: string) => void
  updateTextGenToText: (messageId: number, text: string) => void
  resetMessages: () => void
}

const useStore = create<Store>()(
  persist(
    (set, get) => ({
      user: null,
      messages: [],
      setUser: (user) => set({ user }),
      addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
      updateVideoGenToVideo: (messageId, videoUrl) =>
        set((state) => ({
          messages: state.messages.map((message) =>
            message.id === messageId
              ? {
                ...message,
                type: "video",
                content: videoUrl,
              }
              : message
          ),
        })),
      updateTextGenToText: (messageId, text) =>
        set((state) => ({
          messages: state.messages.map((message) =>
            message.id === messageId
              ? {
                ...message,
                type: "text",
                content: text,
              }
              : message
          ),
        })),
      resetMessages: () => set({ messages: [] }),
    }),
    {
      name: "fit-ease-store",
    }
  )
)

export const useStoreUser = () => useStore((state) => state.user)
export const useStoreMessages = () => useStore((state) => state.messages)
export const useStoreSetUser = () => useStore((state) => state.setUser)
export const useStoreAddMessage = () => useStore((state) => state.addMessage)
export const useStoreUpdateVideoGenToVideo = () => useStore((state) => state.updateVideoGenToVideo)
export const useStoreUpdateTextGenToText = () => useStore((state) => state.updateTextGenToText)
export const useStoreResetMessages = () => useStore((state) => state.resetMessages)