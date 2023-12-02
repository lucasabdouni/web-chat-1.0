import { CartMessage } from '@/app/components/cartMessage'
import Header from '@/app/components/header'
import InputMessage from '@/app/components/inputMessage'

export default function Home() {
  return (
    <div className="w-full h-screen">
      <section className="w-full max-w-[1193px] mx-auto p-2">
        <Header />

        <div className="w-full h-full max-h-[70vh] flex flex-col gap-5 bg-slate-100 bg-opacity-70 rounded-lg p-8 justify-end overflow-y-scroll">
          <CartMessage
            name="Lucas"
            message="Olá, eu sou o lasdasdasasdasdsas"
          />
          <CartMessage name="Lucas" message="Olá, eu sou o lucas" />

          <CartMessage
            name="Lucas"
            message="Olá, eu sou o lucasOlá, eu sou o lucasOlá, eu sou o lucasOlá, eu sou o lucasOlá, eu sou o lucasOlá, eu sou o lucasOlá, eu sou o lucasOlá, eu sou o lucasOlá, eu sou o lucasOlá, eu sou o lucasOlá, eu sou o lucasOlá, eu sou o lucasOlá, eu sou o lucasOlá, eu sou o lucasOlá, eu sou o lucasOlá, eu sou o lucasOlá, eu sou o lucasOlá, eu sou o lucasOlá, eu sou o lucasOlá, eu sou o lucasOlá, eu sou o lucasOlá, eu sou o lucas"
          />
          <CartMessage name="Lucas" message="Olá, eu sou o lucas" />
          <CartMessage name="Lucas" message="Olá, eu sou o lucas" />
          <CartMessage name="Lucas" message="Olá, eu sou o lucass" />
          <CartMessage name="Lucas" message="Olá, eu sou o lucass" />
          <CartMessage name="Lucas" message="Olá, eu sou o lucass" />
          <CartMessage name="Lucas" message="Olá, eu sou o lucass" />
        </div>
        <InputMessage />
      </section>
    </div>
  )
}
