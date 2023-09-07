// "use client";
import React from "react";
export type languageType={
    code:string,
    name:string
}
const LanguageCode = () => {
    const [ lancode,setLangCode]=React.useState<languageType[] |null>(null);

        const languageCode=async():Promise<void>=>{
            const url="https://gist.githubusercontent.com/jrnk/8eb57b065ea0b098d571/raw/936a6f652ebddbe19b1d100a60eedea3652ccca6/ISO-639-1-language.json"
            const res= await fetch(url);
            const body: languageType[]=await res.json();
            setLangCode(body)
        }
        React.useEffect(()=>{
            languageCode();
        },[])
    
    return (
<div className="flex flex-col items-start justify-start">
        {lancode &&  lancode.map((obj:languageType,index)=>(
            <div className="flex flex-col m-auto items-start justify-start" key={index}>
                <h6 className="text-xl">{`Name:${obj.name},Code: ${obj.code}`}</h6>
            </div>
        ))}
    </div>
    )
}

export default LanguageCode