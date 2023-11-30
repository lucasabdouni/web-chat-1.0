import FormLogin from './component/form-login'

export default function Home() {
  return (
    <section className="h-screen flex items-center justify-center">
      <div className="flex flex-col items-center bg-zinc-100 p-16">
        <h1 className="text-emerald-900 font-bold text-2xl">Faça o login</h1>
        <FormLogin />
      </div>
    </section>
  )
}
