import type { Session } from "next-auth"


export type accountType = {
  id: string,
  userId: string,
  type: string,
  provider: string,
  providerAccountId: string,
  refresh_token?: string,
  access_token?: string,
  expires_at?: number,
  token_type?: string,
  scope?: string,
  id_token?: string,
  session_state?: string,
}

export type sessionType = Session

export type userType = {
  id: string,
  name: string | null,
  email: string | null,
  emailVerified: Date | null,
  password: string,
  image: string | null,
  posts: PostDataType[],
  answers: answerType[],
  accounts: accountType[],
}
export type userTypeNoAcc = {
  id: string,
  name: string | null,
  email: string | null,
  emailVerified: Date | null,
  password: string | null,
  image: string | null,
  posts: PostDataType[],
  answers: answerType[],

}
export type verifyTokenType = {
  identifier: string,
  token: string,
  expires: Date
}
export type userInfoType = {
  id: string,
  name: string,
  email: string,
  image?: string,
  password?: string
}
export type showType = {
  loaded: boolean,
  id: number | null
}
export type imgUserType = {
  id: string,
  name?: string,
  email: string,
  password: string,
  posts: imgPostDataType[],
  answers: answerType[]
}
export type registerType = {
  id?: string,
  name: string,
  email: string,
  emailVerified?: Date,
  password: string | null,
}
export type testPosts = {
  posts: PostDataType[],
  answers: answerType[]
}
export type DataType = {
  id: number,
  title: string,
  content: string,
  answers: answerType[],
  published: boolean,
  date?: Date,
  userId: string,
  image?: string
}[]
export type PostDataType = {
  id: number | null,
  title?: string,
  content?: string,
  date?: Date,
  answers: answerType[] | [],
  published: boolean,
  userId: string,
  imageKey?: string

}
export type formType = {
  filename: string,
  file: File[],
}
export type fileType = {
  name: string,
  lastModified: number,
  lastModifiedDate: Date,
  webkitRelativePath?: string,
  size: number,
  type: string
}[] | null

export type imgPostDataType = {
  id: number,
  title: string,
  content: string,
  img: string,
  date?: Date,
  answers: answerType[],
  published?: boolean,
  userId: string

}
export type loginType = {
  email: string,
  password: string
}
export type adminType = {
  email: string,
  name?: string
}
export type adminDeleteUserType = {
  userId: string,
  email: string,
  name: string
}
export type loginTypedata = {
  data: {
    email: string,
    password: string
  }
}
export type userTypeData = {
  data: {
    name: string,
    email: string,
    password: string
  }
}
export type msgType = {
  loaded: boolean,
  msg: string | null
}
export type userAccountType = {
  loaded: boolean,
  data: {
    id: string,
    name: string | null,
    email: string | null,
    image: string | null,
    status: "loading" | "authenticated" | "unauthenticated"
  } | null
}
export type answerType = {
  id: number,
  answer: string,
  userId: string,
  postId: number,
  date?: Date
}
export type answerType_2 = {
  answer: string,
  userId: string,
  postId: number,
}
export type ansResponse = {
  title: string,
  answer: string,
}
export type addCommentType = {
  loaded: boolean,
  postId: number | null
}
export type ImgDataType = {
  id: number,
  title: string,
  content: string,
  answers: answerType[],
  published?: boolean,
  date?: Date,
  userId: string,
  img: string

}[]

export type deleteType = {
  loaded: boolean,
  postId: number,
  userId: string,
  deleteThis: boolean,
  published: boolean,
  adminuser?: string,
  adminemail?: string
}
export type useUploadType = {
  url: string,
  file: File | undefined,
  userId: string | null,

}
export type mainGetSignup = {
  id: number;
  name: string | null;
  email: string | null;
  date: Date | string;
}
export type mainPageHit = {
  id: number;
  page: string | null;
  count: number | null;
  date: Date | string;
}