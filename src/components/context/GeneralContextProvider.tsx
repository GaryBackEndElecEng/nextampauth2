"use client"
import React from 'react';
import type { userAccountType, DataType, msgType, userType, answerType, userInfoType, PostDataType } from "./type";
import { useSession } from "next-auth/react";
import type { Session } from "next-auth";
const base_url = process.env.NEXT_PUBLIC_baseurl;


type generalContextType = {
  setAccount: React.Dispatch<React.SetStateAction<userAccountType | null>>,
  account: userAccountType | null,
  allPosts: PostDataType[],
  setAllPosts: React.Dispatch<React.SetStateAction<PostDataType[]>>,
  setSignin: React.Dispatch<React.SetStateAction<boolean>>,
  signin: boolean,
  isSignin: boolean,
  setIsSignin: React.Dispatch<React.SetStateAction<boolean>>,
  session: Session | null,
  status: "loading" | "authenticated" | "unauthenticated"
  setMsg: React.Dispatch<React.SetStateAction<msgType>>,
  msg: msgType,
  setUsers: React.Dispatch<React.SetStateAction<userType[]>>,
  users: userType[],
  allUsers: userType[],
  setGenMsg: React.Dispatch<React.SetStateAction<msgType>>
  setAllUsers: React.Dispatch<React.SetStateAction<userType[]>>,
  setUserInfos: React.Dispatch<React.SetStateAction<userInfoType[] | null>>,
  userInfos: userInfoType[] | null,
  genMsg: msgType,
  setUserId: React.Dispatch<React.SetStateAction<string | null>>,
  userId: string | null,
  setAllAnswers: React.Dispatch<React.SetStateAction<answerType[]>>,
  allAnswers: answerType[],
  setSignUpEmail: React.Dispatch<React.SetStateAction<{ email: string | undefined, name: string | undefined }>>,
  signUpEmail: { email: string | undefined, name: string | undefined },
  setSignup: React.Dispatch<React.SetStateAction<boolean>>,
  signup: boolean,
  setPage: React.Dispatch<React.SetStateAction<string | undefined>>,
  page: string | undefined,
  pageInfo: string | undefined,
  setClose: React.Dispatch<React.SetStateAction<boolean>>,
  close: boolean
}
export const GeneralContext = React.createContext<generalContextType>({} as generalContextType);

const GeneralContextProvider = (props: any) => {
  const { data: session, status } = useSession();
  const [account, setAccount] = React.useState<userAccountType | null>(null);
  const [allPosts, setAllPosts] = React.useState<PostDataType[]>([]);
  const [allAnswers, setAllAnswers] = React.useState<answerType[]>([]);
  const [signin, setSignin] = React.useState<boolean>(false);
  const [isSignin, setIsSignin] = React.useState<boolean>(false);
  const [msg, setMsg] = React.useState<msgType>({ loaded: false, msg: null })
  const [users, setUsers] = React.useState<userType[]>([]);
  const [allUsers, setAllUsers] = React.useState<userType[]>([]);
  const [genMsg, setGenMsg] = React.useState<msgType>({ loaded: false, msg: "" })
  const [userId, setUserId] = React.useState<string | null>(null);
  const [isCsrf, setIsCsrf] = React.useState<boolean>(false);
  const [userInfos, setUserInfos] = React.useState<userInfoType[] | null>(null);
  const [signUpEmail, setSignUpEmail] = React.useState<{ email: string | undefined, name: string | undefined }>({ name: "", email: "" });
  const [signup, setSignup] = React.useState<boolean>(false);
  const [page, setPage] = React.useState<string | undefined>("");
  const [pageInfo, setPageInfo] = React.useState<string | undefined>("");
  const [close, setClose] = React.useState<boolean>(false);

  React.useMemo(async () => {
    try {
      const res = await fetch(`/api/posts/posts`);
      if (res.ok) {
        const body: PostDataType[] = await res.json()
        setAllPosts(body);

      }
    } catch (error) {

    }
  }, []);

  React.useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await fetch(`/api/posts/usersinfo`);
        if (res.ok) {
          const body: userInfoType[] = await res.json()

          setUserInfos(body);
        }
      } catch (error) {

      }
    }
    fetchUserInfo()
  }, []);

  React.useEffect(() => {
    const recordHit = async () => {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "*/*"
        }, body: JSON.stringify(page)
      }
      const res = await fetch(`/api/page-hit`, options);
      if (!res.ok) {

        const body: { message: string } = await res.json()
        setPageInfo(body.message)
      }
      const body: { message: string } = await res.json()
      setPageInfo(body.message)
    }
    if (page) {
      recordHit();
    }
  }, [page]);

  return (
    <GeneralContext.Provider value={{ account, setAccount, allPosts, setAllPosts, signin, setSignin, isSignin, setIsSignin, session, status, msg, setMsg, users, setUsers, allUsers, setAllUsers, genMsg, setGenMsg, userId, setUserId, allAnswers, setAllAnswers, userInfos, setUserInfos, signUpEmail, setSignUpEmail, signup, setSignup, setPage, page, pageInfo, setClose, close }}>
      {props.children}
    </GeneralContext.Provider>
  )
}

export default GeneralContextProvider

