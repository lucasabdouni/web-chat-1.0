'use client'

import { Send } from 'lucide-react'

export default function InputMessage() {
  return (
    <div className="w-full flex gap-1 mt-2">
      <textarea
        className="flex-1 flex item-center justify-center p-2 h-12 bg-slate-100 text-teal-600 placeholder:text-teal-600 bg-opacity-70 rounded-lg"
        placeholder="Digite aqui sua mensagem..."
      />
      <button className="bg-slate-100 bg-opacity-70 text-teal-600 px-4 rounded-lg hover:bg-opacity-100">
        <Send />
      </button>
    </div>
  )
}
