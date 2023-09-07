import React,{MouseEvent} from 'react';
import {countryCodes} from "../weather/countryCode"
type countryCodeType={
    name: string;
    code: string;
}
type typeCurrType = { ky: string, val: string }
type keyType = { key: string, loaded: boolean }
type inputType={
 obj:{ ky: string, val: string }
 setPutKey:React.Dispatch<React.SetStateAction<keyType>>,
 countryCode:countryCodeType | null,
 setCurrItem:React.Dispatch<React.SetStateAction<typeCurrType | null>>
 
 
 }
const CurrencyItem = ({obj,setPutKey,countryCode,setCurrItem}:inputType) => {
    const buttonRef=React.useRef(null);
    const [showButt,setShowButt]=React.useState<boolean>(false);
    const [getCountryCodes,setGetCountryCodes]=React.useState<countryCodeType[]|null>(null);

    React.useMemo(()=>{
        const temp:countryCodeType[]=countryCodes
        setGetCountryCodes(temp);
    },[]);

    React.useEffect(()=>{
        const observer=new IntersectionObserver(entries=>{
            let entry=entries[0];
            setShowButt(entry.isIntersecting);
        },{threshold:0.7});
        if(buttonRef.current){
            observer.observe(buttonRef.current)
        }
    },[]);

    const handleShowValue = (e: MouseEvent<HTMLDivElement> | undefined, obj:{ky: string,val:string}) => {
        e?.preventDefault();
        if (obj.ky) {
            setPutKey({ loaded: true, key: obj.ky });
            const country=getCountryCodes?.filter(ob=>(ob.name.toLowerCase().match(obj.val.toLowerCase())))[0]
            setCurrItem(obj);
            

        }
    }
  return (
    <div 
    ref={buttonRef}
    className={showButt ? "button flex flex-col justify-center items-center m-auto p-1 transition ease-in-out duration-600 cursor-pointer bg-blue text-white "
    :"button-two flex flex-col justify-center items-center m-auto text-white bg-black  "}  
    onClick={(e) => handleShowValue(e, obj)} 
    >
        <p className="text-center text-3ml text-teal-500">$ tag: {obj.ky}</p>
        <p className="text-center text-3ml">$: {obj.val}</p>
    </div>
  )
}

export default CurrencyItem