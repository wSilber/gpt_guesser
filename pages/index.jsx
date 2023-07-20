import Head from 'next/head'
import dynamic from 'next/dynamic'
import ChatRoomsComponent from '@/components/ChatRooms';

const AblyChatComponent = dynamic(() => import('../components/AblyChatComponent'), { ssr: false });

export default function Home() {
  return (
    <div className="scontainer">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Next.js Chat Demo</h1>
        <ChatRoomsComponent/>
        <AblyChatComponent />
      </main>

    </div>
  )
}