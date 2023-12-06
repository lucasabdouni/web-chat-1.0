import Header from '@/app/components/header'
import { MessageList } from './components/messageList'

export default async function Home() {
  return (
    <div className="w-full h-screen">
      <section className="w-full max-w-[1193px] mx-auto p-2">
        <Header />
        <MessageList />
      </section>
    </div>
  )
}
