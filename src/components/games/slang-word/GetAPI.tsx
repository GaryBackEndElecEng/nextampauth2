"useclient";
import React,{MouseEvent} from 'react';
import axios,{AxiosError,isAxiosError} from 'axios';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import type { msgType} from "@component/context/type";

type arrayType={
    definition:string,
    permalink:string,
    thumbs_up:number,
    author:string,
    word:string,
    defid:number
    current_vote:string,
    written_on:string,
    example:string,
    thumbs_down:number
}

type outputType={
    list: arrayType[]
}
type inputType={
    phrase:string | null,
    setMsg:React.Dispatch<React.SetStateAction<msgType>>
}

const GetAPI = ({phrase,setMsg}:inputType) => {
    const [getOutput,setGetOutput]=React.useState<outputType | null>(null);
    const apiKey: string | undefined = process.env.NEXT_PUBLIC_rapidAip;
    const options = {
        method: 'GET',
        url: 'https://mashape-community-urban-dictionary.p.rapidapi.com/define',
        params: {term: phrase},
        headers: {
          'X-RapidAPI-Key':`${apiKey}`,
          'X-RapidAPI-Host': 'mashape-community-urban-dictionary.p.rapidapi.com'
        },
    
      };

    if(phrase && apiKey ){
        const getAPI_= async()=>{
        try {
            const res = await axios.request(options);
            const body = res.data;
            setGetOutput(body);
            setMsg({loaded:true,msg:" the answers are below"})
           
        } catch (error) {
            if(axios.isAxiosError(error)){
                console.error(error.response)
                setMsg({loaded:false,msg:"sorry something went wrong. try again later"})
            }else{
                console.error(error)
            }
            
        }
    }
    getAPI_();
    }
return(
    <article className={phrase ? "grid grid-cols-1 md:grid-cols-2  mb-2 px-1 w-full gap-y-4 place-items-center ":" flex flex-col items-center"}>
                {getOutput && phrase ?
                    getOutput.list.sort((a,b)=>(b.thumbs_up - a.thumbs_up)).map((obj, index) => (
                        <div className=" grid-spans-1 flex flex-col justify-center items-center shadow-lg rounded-lg shadow-blue p-2" key={index}>

                            <p className="text-md mx-auto text-xl underline leading-10"><span className="font-bold text-2xl">word</span>: {obj.word}</p>
                            
                            <h6 className="text-lg mx-0"><span className="font-bold my-2 w-full">definition:</span>{obj.definition}</h6>
                            <h6 className="text-lg mx-0"><span className="font-bold my-2 w-full">example:</span>{obj.example}</h6>
                            <div className="flex flex-col justify-center items-center gap-3">
                                <p className="text-md">author:{obj.author}</p>
                                <h2 className="text-md flex flex-row flex-wrap gap-2">link:
                                <a href={obj.permalink} className="text-xl p-2 text-blue shadow-lg hover:shadow-xl hover:shadow-blue hover:tracking-wider">{obj.author}</a>
                                </h2>
                                <p className="text-md"><ThumbDownIcon sx={{mr:2,color:"red"}}/>:{obj.thumbs_down}</p>
                                <p className="text-md"><ThumbUpIcon sx={{mr:2,color:"red"}}/>:{obj.thumbs_up}</p>
                            </div>
                        </div>
                    ))
                    :
                    <div className="grid place-items-center w-full"
                    
                    >
                        {phrase ?
                         <h3 className="mx-auto font-bold text-xl text-center"> connection error,,sorry</h3>
                        :
                        <h3 className=" text-center  font-bold text-xl "> input a word</h3>}
                    </div>
                }
            </article>
)
}

export default GetAPI