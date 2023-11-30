'use client'

import { Eye, EyeOff } from 'lucide-react'
import React, { InputHTMLAttributes, useState } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string
}

export default function InputPassword({ title, ...rest }: InputProps) {
  const [fillPassword, setFillPassword] = useState(false)

  function handleFillPassword() {
    setFillPassword(!fillPassword)
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-emerald-800 text-sm" htmlFor={rest.id}>
        {title}
      </label>
      <div className="flex justify-center px-3 py-2 border-1 border-[1px] rounded-sm bg-zinc-50 border-emerald-800">
        <input
          type={fillPassword ? 'text' : 'password'}
          className="text-zinc-500 bg-zinc-50 placeholder:text-sm"
          {...rest}
        />
        <button
          type="button"
          className="text-zinc-300"
          onClick={handleFillPassword}
        >
          {fillPassword ? <Eye /> : <EyeOff />}
        </button>
      </div>
    </div>
  )
}
