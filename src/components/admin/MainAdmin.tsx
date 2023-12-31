"use client";
import React from 'react';
import type { userType, showType } from "@component/context/type";
import type { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { convertDate } from "@component/ultilities";
import DeleteUpdate from "./DeleteUpdate";
import { GeneralContext } from "@component/context/GeneralContextProvider";
import DeleteUser from "./DeleteUser";
import AdminAnswers from "./AdminAnswers";
import Image from 'next/image';
import Link from "next/link";
import { ThemeContext } from '../context/ThemeContext';

type mainAdminType = {
  session: Session,

}
const MainAdmin = ({ session }: mainAdminType) => {
  const { allUsers } = React.useContext(GeneralContext);
  const [users, setUsers] = React.useState<userType[]>([]);
  const router = useRouter();
  const adminuser = (session && session.user) ? session.user.name : null;
  const adminemail = (session && session.user) ? session.user.email : null;

  React.useEffect(() => {
    if (allUsers) {
      setUsers(allUsers.filter(user => (user.email !== adminemail)))
    }
  }, [allUsers, setUsers, adminemail]);



  return (
    <div className={` p-10 flex flex-col justify-center items-center gap-3 w-full dark:bg-black dark:text-white`}>
      <Link href={"/admin/signup-pagehits"}
        className="shadow-md shadow-blue rounded-full border border-blue px-3 "
      >
        <h3 className="text-lg text-center">Signups&pageHits</h3>
      </Link>
      <h2 className="text-lg text-center font-bold">Main Client Admin</h2>
      <h2 className="text-md text-center">{session?.user?.name}</h2>
      <h2 className="text-md text-center">{session?.user?.email}</h2>
      <div className="flex flex-col items-center justify-center">
        <button className="py-1 px-3 rounded-md shadow-md shadow-blue-500" onClick={() => router.push("/")}>
          return
        </button>
      </div>
      <h2 className="text-md text-center text-blue-600 font-bold">count:{allUsers.length}</h2>
      <div className="grid grid-cols-3 my-2 p-3 gap-3 place-items-center place-content-center mt-6">
        {users.map((user, index) => (
          <div className="col-span-1 mx-auto flex flex-col items-center justify-center shadow-md rounded-lg shadow-blue-500 py-9 px-3 w-full relative" key={`${index}-user`}>
            <div className="absolute -top-5 right-0">
              <DeleteUser
                adminuser={adminuser}
                adminemail={adminemail}
                user={user} />
            </div>
            <h2 className="text-lg m-0 py-2 font-bold">(.{index + 1} name/email</h2>
            <h2 className="text-lg m-0 py-2">{user.name}</h2>
            <h2 className="text-lg m-0 py-2">{user.email}</h2>
            <h3 className="text-lg text-center font-bold">posts</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2  mx-auto mt-4">

              {user.posts && user.posts.map((post, index) => (
                <div key={`${index}-${post.id}`} className={"flex flex-col items-center col-span-1"}>
                  <div className="text-xl font-bold my-2">
                    <span>delete & update</span> <span className="text-orange underline underline-offset-8"> {`${index + 1}).${post.title}`}</span>
                  </div>
                  <div className="my-3">
                    <DeleteUpdate post={post} />
                  </div>
                  <div className="text-center text-lg">{`${index + 1}).`}
                    <span>
                      {post.title}
                    </span>
                  </div>
                  {post.imageKey &&
                    <Image src={post.imageKey} alt="www" height={300} width={300} className="aspect-video" />
                  }
                  <div className="text-center my-2">
                    {post.content}
                  </div>
                  <div className="text-md text-center font-bold">Date</div>
                  <div className="text-center my-2">
                    {post.date && convertDate(post.date)}
                  </div>
                  {!!user.answers && user.answers.length > 0 &&
                    <AdminAnswers user={user} postId={post.id} />
                  }
                </div>
              ))}
            </div>
          </div>
        ))}

      </div>
    </div>

  )
}

export default MainAdmin