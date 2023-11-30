import React, { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { title, ...rest },
  ref,
) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-emerald-800 text-sm" htmlFor={rest.id}>
        {title}
      </label>
      <input
        ref={ref}
        className="px-3 py-2 border-1 border-[1px] rounded-sm border-emerald-800 bg-zinc-50 text-zinc-500 placeholder:text-sm"
        {...rest}
      />
    </div>
  )
})

Input.displayName = 'Input' // Adicionando o displayName

export default Input
