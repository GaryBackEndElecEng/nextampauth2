"use client";
import React from 'react';
import Image from "next/image";
import { Button } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { GeneralContext } from '../context/GeneralContextProvider';
import type { userAccountType } from "@context/type"


const TestUpload = ({ account }: { account: userAccountType }) => {
    const url = "/api/postImage";
    const [file, setFile] = React.useState<File | undefined>();
    const [fileImage, setFileImage] = React.useState<string>("");
    const userId = account?.data ? account?.data?.id : null;
    const [msg, setMsg] = React.useState<{ loaded: boolean, msg: string | undefined }>({
        loaded: false,
        msg: ""
    });

    const uploadFile = React.useCallback(async () => {
        const uuid = uuidv4().split("-").slice(0, 2).join("");
        const msgFuncisUploaded = async () => {
            if (!file) return
            console.log("executing")
            const ext = file.type.split("/")[1];
            const getKey = `${userId}/${uuid}.${ext}`
            const formData = new FormData();
            formData.set("file", file);
            formData.set("name", getKey);
            const options = {
                method: "POST",
                body: formData
            };
            const res = await fetch(url, options);
            if (!res.ok) {
                return setMsg({ loaded: false, msg: "error" })
            };
            setMsg({ loaded: true, msg: "success" });
            return setTimeout(() => { setMsg({ loaded: false, msg: "" }) }, 1500);
        };
        if (file && url && userId) {
            await msgFuncisUploaded();
        }

    }, [file, url, userId]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await uploadFile();
    }
    return (
        <div className="w-150  rounded flex flex-col items-center justify-center  border border-blue rounded-lg bg-white relative shadow shadow-blue h-auto">
            <div className="w-full  m-auto  ">
                <h3 className="text-center text-lg text-blue font-bold py-5">Test Upload</h3>
                {fileImage &&
                    <Image src={fileImage} alt="www.masterconnect.ca" width={200} height={200}
                        className="aspect-video container mx-auto"
                    />
                }
            </div>
            <form
                className=" m-auto flex flex-col items-center justify-center w-full  "
                onSubmit={(e) => handleSubmit(e)}
            >
                <input
                    type="file"
                    id="file"
                    hidden
                    className=""
                    onChange={(e) => {
                        if (e.target.files) {
                            const file = e.target.files?.[0]

                            setFileImage(URL.createObjectURL(file));
                            setFile(file);

                        }
                    }}
                />
                {file ?
                    <Button isLoading={msg.loaded} colorScheme="teal" variant="ghost" size="small" className="py-1 border border-blue shadow shadow-blue mt-10 rounded-lg aria-label" type="submit" isDisabled={msg.loaded}  >submit</Button>
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

export default TestUpload