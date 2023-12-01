import { redirect } from 'next/navigation'
import FormLogin from './components/form-login'
import { cookies } from 'next/headers'

async function checkTokenExists() {
  const cookieStore = cookies()
  const checkCookiesExists = cookieStore.get('chat.token')

  if (checkCookiesExists) {
    redirect('/home')
  }
}

export default async function Home() {
  await checkTokenExists()

  return (
    <section className="w-full h-screen flex items-center justify-center">
      <div className="flex flex-col items-center bg-zinc-100 p-16">
        <h1 className="text-emerald-900 font-bold text-2xl">Faça o login</h1>
        <FormLogin />
      </div>
    </section>
  )
}
