"use client";
import React, { useState } from 'react';
import { NextPage } from "next";
import Image from "next/image";
import axios from "axios";
import Link from 'next/link';
import { GeneralContext } from '@/components/context/GeneralContextProvider';
import type { PostDataType } from "@context/type";

type msgType = {
  loaded: boolean,
  msg: string | undefined
}
type mainUploadType = {
  setSelectedFile: React.Dispatch<React.SetStateAction<File | undefined>>,
  selectedFile: File | undefined,
  setSelectedImage: React.Dispatch<React.SetStateAction<string>>,
  selectedImage: string,
  setUploading: React.Dispatch<React.SetStateAction<boolean>>,
  uploading: boolean,
  postData: PostDataType,
  setPostData: React.Dispatch<React.SetStateAction<PostDataType>>
  setPicSubmit: React.Dispatch<React.SetStateAction<boolean>>,
  picName: string

}


const ImgUpload = ({
  setSelectedFile,
  selectedFile, setSelectedImage,
  selectedImage,
  setUploading,
  uploading,
  setPostData,
  postData,
  setPicSubmit,
  picName,
}: mainUploadType) => {
  const { userId, account } = React.useContext(GeneralContext);
  const [images, setImages] = useState<string[]>([]);
  const [msg, setMsg] = React.useState<msgType>({ loaded: false, msg: "" })



  const handlePicSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!(selectedFile && postData)) return;

    const extension = selectedFile.type.split("/")[1];
    const getKey = `${picName}.${extension}`;
    const formData = new FormData();
    formData.set("file", selectedFile);
    formData.set("name", getKey);

    const res = await fetch("/api/postImage", {
      method: "POST",
      body: formData
    });
    if (!res.ok) {
      return setMsg({ loaded: false, msg: `uploade was not successful=>${res.status}` })
    }
    setPostData({ ...postData, imageKey: getKey })
    setTimeout(() => { setPicSubmit(true); }, 2000);

    setMsg({ loaded: true, msg: "uploaded successfully" })


    setUploading(false);

  }

  return (
    <div className="w-50  rounded flex flex-col items-center justify-center  border border-blue rounded-lg bg-white relative shadow shadow-blue h-auto">
      <div className="w-full  m-auto  ">
        {selectedImage &&
          <Image src={selectedImage} alt="www" width={125} height={125}
            className="aspect-video" />
        }
      </div>
      <form action="" onSubmit={(e) => handlePicSubmit(e)}
        className=" m-auto flex flex-col items-center justify-center w-full  "
      >
        <input
          type="file"
          className="m-auto flex flex-col items-center justify-center"
          name={picName}
          onChange={(e) => {
            if (e.target.files) {
              const file = e.target.files?.[0]
              setSelectedImage(URL.createObjectURL(file));
              setSelectedFile(file);
            }
          }}
        />
        <button className="py-1 border border-blue shadow shadow-blue mt-10" type="submit" >submit</button>
      </form>
      {msg.loaded ?
        (
          <div className="text-center text-blue font-bold my-2 px-3">
            {msg.msg}
          </div>
        )
        :
        (<div className="text-center text-red font-bold my-2 px-3 underline underline-offset-2">
          {msg.msg}
        </div>)
      }
    </div>

  )
}

export default ImgUpload