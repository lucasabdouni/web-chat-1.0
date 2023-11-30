import React, { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string
}

export default function Input({ title, ...rest }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-emerald-800 text-sm" htmlFor={rest.id}>
        {title}
      </label>
      <input
        className="px-3 py-2 border-1 border-[1px] rounded-sm border-emerald-800 bg-zinc-50 text-zinc-500 placeholder:text-sm"
        {...rest}
      />
    </div>
  )
}
