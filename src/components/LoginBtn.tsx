"use client"
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Component() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <button className="flex flex-col px-4 py-autu rounded-full border border-blue-600 shadow-md shadow-blue-200" onClick={() => signOut()}>Sign out</button>
       
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button className="flex flex-col px-4 py-auto rounded-full border border-blue-600 shadow-md shadow-blue-200" onClick={() => signIn()}>Sign in</button>
      <br/>
      Register <br />
      <Link href={"/register"}>
      <button className="flex flex-col px-4 py-auto rounded-full border border-blue-600 shadow-md shadow-blue-200">register</button>
      </Link>
    </>
  )
}