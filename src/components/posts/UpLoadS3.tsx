"use client";
import React, { useState } from 'react';
import { Button } from "@chakra-ui/react";
// import { NextPage } from "next";
import Image from "next/image";
import axios from "axios";
import Link from 'next/link';
import { GeneralContext } from '@/components/context/GeneralContextProvider';
import type { PostDataType } from "@context/type";
import { v4 as uuidv4 } from "uuid";

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
  userId: string,

}
export function gens3KeyName(file: File, userId: string): string {
  const uuid = uuidv4().split("-").slice(0, 2).join("");
  const ext = file.type.split("/")[1];
  return `${userId}/${uuid}.${ext}`
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
  userId,
}: mainUploadType) => {
  const [images, setImages] = useState<string[]>([]);
  const [msg, setMsg] = React.useState<msgType>({ loaded: false, msg: "" });
  const [isPic, setIsPic] = React.useState<boolean>(false);
  const url = "/api/postImage";


  function testImage(file: File): boolean {
    let retBool: boolean = false;
    if (!file) return false

    const img: string = file.type.split("/")[0];
    if (img === "image") {
      return true
    } else {
      return false
    }


  }


  const uploadFile = async (): Promise<void> => {
    if (!selectedFile || !userId) return
    const getKey = gens3KeyName(selectedFile, userId);
    const isImage: boolean = testImage(selectedFile);
    console.log(isImage, selectedFile.type)

    const formData = new FormData();
    formData.set("file", selectedFile);
    formData.set("name", getKey);
    const options = {
      method: "POST",
      body: formData
    };
    const res = await fetch(url, options);
    if (!res.ok) {
      setMsg({ loaded: false, msg: "error" })
    };
    setMsg({ loaded: true, msg: "success" });
    setPostData({ ...postData, imageKey: getKey });
    setUploading(false);
    setPicSubmit(true);
    setIsPic(false);
    setTimeout(() => { setMsg({ loaded: false, msg: "" }) }, 1500);


  };


  const handlePicSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!(selectedFile && postData)) return;
    await uploadFile();

  }

  return (
    <div className="w-full  rounded flex flex-col items-center justify-center  border border-blue rounded-lg bg-white relative shadow-lg shadow-blue h-[20vh]">
      <div className="w-full  m-auto  ">
        <h3 className="text-center text-lg text-blue font-bold py-5"> Uploader</h3>
        {selectedImage &&
          <Image src={selectedImage} alt="www.masterconnect.ca" width={200} height={200}
            className="aspect-video container mx-auto"
          />
        }
      </div>
      <form
        className=" m-auto flex flex-col items-center justify-center w-full bg-white  "
        onSubmit={(e) => handlePicSubmit(e)}
      >
        <input
          type="file"
          id="file"
          hidden
          className=""
          onChange={(e) => {
            if (e.target.files) {
              const file = e.target.files?.[0]
              if (testImage(file)) {
                setSelectedImage(URL.createObjectURL(file));
                setSelectedFile(file);
                setIsPic(true);
                setMsg({ loaded: true, msg: "upload?" });
              } else {
                setMsg({ loaded: false, msg: "must be an image type,,try again" });
              }

            }
          }}
        />
        {selectedFile && isPic ?
          <Button isLoading={uploading} colorScheme="teal" variant="ghost" size="small" className="py-1 border border-blue shadow shadow-blue mt-10 rounded-lg aria-label px-3 rounded-full" type="submit" isDisabled={!isPic}  >up load</Button>
          :
          <Button as={"label"} htmlFor="file" colorScheme="teal" variant="ghost" size="small" className="py-1 border border-blue shadow shadow-blue mt-10 rounded-lg aria-label" type="submit"  >choose file</Button>}
      </form>
      {
        msg.loaded ?
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
    </div >

  )
}

export default ImgUpload