import HandleWs from "@/components/HandleWs.client";
import Rooms from "@/components/Rooms.client";
import Link from 'next/link'

export default function Home() {
  return (
    <main className='container mx-auto h-full'>
      <h1>
        You are logged in!
      </h1>
      <div>
        <HandleWs />
      </div>
      <Rooms />
      <div>
        <Link href="/play/game"> To The Game!</Link>
      </div>
    </main>
  )
}