import type {Metadata} from 'next';
import {metaservicepage} from "@component/metadata/metaservicepage";
export const metadata:Metadata=metaservicepage;
import axios from "axios";
type policyType={
        id: number,
        title: string,
        sectionTitle: string,
        subSectionTitle:string,
        content:string,
        content1:string,
        content2: string,
        content3:string,
        webImage: string
}
async function getTerms():Promise<policyType | undefined>{
    const url=`${process.env.NEXT_PUBLIC_serverApi}/category/`;
    try {
        const res= await axios.get(url);
        const body:policyType= res.data.filter((obj:any)=>(obj.section==="policy"))[0].catWordSnippet[0]
        return body;
    } catch (error) {
        console.error(new Error("did not connect"))
    }
}
const Service = async() => {
const policy:policyType | undefined= await getTerms();

  return (
    <main className="lg:mx-auto lg:container">
        {policy ?
        <section className="flex flex-col justify-center items-start">
            <h1 className="text-center text-3xl text-black py-2">
                {policy.title}
            </h1>
            <article className="m-auto justify-self-center p-1 px-2 py-3 text-lg text-black indent-2 firstLet" >{policy.content}</article>
            <article className="m-auto justify-self-center p-1 px-2 py-3 text-lg text-black indent-2 firstLet" >{policy.content1}</article>
            <article className="m-auto justify-self-center p-1 px-2 py-3 text-lg text-black indent-2 firstLet" >{policy.content2}</article>
            <article className="m-auto justify-self-center p-1 px-2 py-3 text-lg text-black indent-2 firstLet" >{policy.content3}</article>
        </section>
        :
        <div className="flex flex-cols justify-center items-center">
            <h3 className="text text-2xl">could not get</h3>
        </div>
        }
    </main>
  )
}

export default Service