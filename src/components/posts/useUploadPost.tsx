import React from 'react';
import { v4 as uuidv4 } from "uuid";
import type { useUploadType } from "@context/type";

const useUploadPost = async (
    url: string | null,
    file: File | undefined,
    userId: string | null
) => {
    const uuid = uuidv4().split("-").slice(0, 2).join("");
    const [msg, setMsg] = React.useState<{ loaded: boolean, msg: string | undefined }>({
        loaded: false,
        msg: ""
    });
    const msgFuncisUploaded = async () => {
        if (file && url && userId) {
            const ext = file.type.split("/")[1];
            const getKey = `${userId}-${uuid}.${ext}`
            const formData = new FormData();
            formData.set("file", file);
            formData.set("name", getKey);
            const options = {
                method: "POST",
                body: formData
            };
            const res = await fetch(url, options);
            if (!res.ok) {
                return setMsg({ loaded: false, msg: `upload was not successful=>${res.status}` })
            };
            return setMsg({ loaded: true, msg: "success" });
        };
    };
    return { msgFuncUpload: msgFuncisUploaded, ...msg }

}

export default useUploadPost