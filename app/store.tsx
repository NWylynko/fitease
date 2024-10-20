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
    text: string
    sender: 'user' | 'bot'
    avatar: string
  }[],

  setUser: (user: Store['user']) => void
  addMessage: (message: Store['messages'][0]) => void
  resetMessages: () => void
}

const useStore = create<Store>()(
  persist(
    (set, get) => ({
      user: null,
      messages: [],
      setUser: (user) => set({ user }),
      addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
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