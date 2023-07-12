import ConnectWs from "@/components/ConnectWs.client";

export default function Home() {
  return (
    <main className='container flex mx-auto h-full'>
      <h1>
        You are logged in!
      </h1>
      <div>
        <ConnectWs />
      </div>
    </main>
  )
}