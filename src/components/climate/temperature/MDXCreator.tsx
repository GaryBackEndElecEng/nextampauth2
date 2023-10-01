import React from 'react';
import type { BlogpostDataType } from "@context/blogTypes";
import HomeIcon from '@mui/icons-material/Home';
import Button from "@component/component/Button";


import { GeneralContext } from '@/components/context/GeneralContextProvider';
import Link from 'next/link';

const MDXCreator = () => {
    const { msg, setMsg } = React.useContext(GeneralContext);
    const [data, setData] = React.useState<BlogpostDataType | null>(null);
    const fileName = "climate.temp.mdx";

    React.useEffect(() => {
        const getFile = async () => {
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*"
                },
                body: JSON.stringify({ file: fileName })
            }
            const res = await fetch("/api/blog", options);
            if (!res.ok) {
                const body: { message: string } = await res.json()
                setMsg({ loaded: false, msg: `did not get blog : ${body.message}` });
                console.error(body.message)
            }
            setMsg({ loaded: true, msg: "Time-line" });
            const body: { data: BlogpostDataType } = await res.json();
            setData(body.data);


        }
        getFile();
    }, []);


    return (
        <div className="  mx-1 mt-4">

            {msg.loaded ? (
                <h3 className="text-center text-xl mb-2 font-bold text-blue-800 underline underline-offset-8">{msg.msg} : {data?.title}</h3>
            ) : (<h4 className="text-center mb-2 font-bold text-red-800 text-xl underline underline-offset-8">{msg.msg}</h4>)}

            {data &&
                <section className={"bg-white/90 p-1 prose text-prose"} dangerouslySetInnerHTML={{ __html: data?.contentHTML }} />
            }
            <Link href={"/"}>
                <Button>
                    <HomeIcon sx={{ mr: 1, color: "red" }} />
                    home

                </Button>
            </Link>
        </div>
    )
}

export default MDXCreator