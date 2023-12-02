interface CartMessageProps {
  name: string
  message: string
}

export function CartMessage({ message, name }: CartMessageProps) {
  return (
    <div className="max-w-[80%] w-full bg-teal-600 px-5 py-2 rounded-xl">
      <span className="text-sm">{name}</span>
      <p className="mt-2 w-full">{message}</p>
    </div>
  )
}
