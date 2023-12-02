import { AlertCircle } from 'lucide-react'

interface ErrorMessageProps {
  message?: string
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div>
      <p className="w-full flex justify-center items-center gap-2 p-2 bg-rose-500 text-sm">
        <AlertCircle />
        {message}
      </p>
    </div>
  )
}
