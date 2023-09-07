import Image from 'next/image'
import LoginBtn from "@component/LoginBtn";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center justify-center"><LoginBtn/></div>
      <Link href={"/posts"}>
        <button className="flex flex-col items-center m-auto border border-blue-600 rounded-full px-4 py-auto">posts</button>
      </Link>
      
    </main>
  )
}
