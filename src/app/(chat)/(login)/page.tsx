import FormLogin from './components/form-login'

export default async function Home() {
  return (
    <section className="w-full m-auto h-screen flex items-center justify-center">
      <div className="flex flex-col items-center bg-zinc-100 p-4 sm:p-16">
        <h1 className="text-emerald-900 font-bold text-2xl">Faça o login</h1>
        <FormLogin />
      </div>
    </section>
  )
}
