import Image from 'next/image'
import LoginBtn from "@component/LoginBtn";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LoginBtn/>
    </main>
  )
}
