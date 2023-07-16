import ConnectWs from "@/components/ConnectWs.client";
import Link from 'next/link'

export default function Home() {
  return (
    <main className='container mx-auto h-full'>
      <h1>
        You are logged in!
      </h1>
      <div>
        <ConnectWs />
      </div>
      <div>
        <Link href="/play/game"> To The Game!</Link>
      </div>
    </main>
  )
}