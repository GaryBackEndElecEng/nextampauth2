"use client";
import React, { useEffect } from 'react'
import api from '@component/axios/api';
import {icons} from "./Icons";
import type {allCategoryType,catWordSnippet,categoryType,categoryGeneralInfo,imageCategory,whyChoosUsType,articleType,articlesType,countryType,navImageLinkType} from "@context/Types";
import {allNavLinks} from "./navList";
import countriesArr from "@context/country.json";
// import { seriesType, barType, xaxisType, lineStrokeType, graphType_type, legendType,barDataLabelType,BarLabelTotalType } from '@/components/extra/apexChart/types';

// const staticImage=process.env.NEXT_PUBLIC_static;
// const masterImage=process.env.NEXT_PUBLIC_aws;


type navType = {
    name: string,
    link: string
}[]
type navListType={
    name:string,
    link:string,
    desc:string,
    icon: React.ReactElement<any, any>
}
export type navContextType={
    navs:navImageLinkType[],
}
export type generalContextType={
    allCategory:allCategoryType[],
    generalInfo:categoryGeneralInfo | null,
    whyChooseUs:whyChoosUsType[] | null,
    extraImages:imageCategory[] | null,
    termsOfService:catWordSnippet | null,
    setClose: React.Dispatch<React.SetStateAction<boolean>>,
    close:boolean,
    
    setSignin: React.Dispatch<React.SetStateAction<boolean>>,
    signin:boolean,
    isSignin:boolean,
    setIsSignin: React.Dispatch<React.SetStateAction<boolean>>,
}
export type articlesContextType={
    articles:articlesType[] 
}
export type ultilType={
    getCountries:countryType[] | null
}
type mainCountryContext = {
    show:boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>,
    showNative:boolean,
    setShowNative: React.Dispatch<React.SetStateAction<boolean>>,
    showLang:boolean,
    setShowLang: React.Dispatch<React.SetStateAction<boolean>>,
    showCurr:boolean,
    setShowCurr: React.Dispatch<React.SetStateAction<boolean>>,
    showDenom:boolean,
    setShowDenom: React.Dispatch<React.SetStateAction<boolean>>,
    }

    //====CREATE CONTEXT=======//
export const GeneralContextNoAcc= React.createContext<generalContextType>({} as generalContextType);
export const CountryContext= React.createContext<mainCountryContext>({} as mainCountryContext);
export const UltilsContext=React.createContext<ultilType>({} as ultilType)

export const ArticleContext = React.createContext<articlesContextType>({} as articlesContextType);
export const NavContext = React.createContext<navContextType>({} as navContextType);
//===========CREATE CONTEXT===============//

export const GeneralProviderNoAccount = (props:any) => {
    const [close,setClose]=React.useState<boolean>(false);
    const [navs,setNavs]=React.useState<navImageLinkType[] >([]);
    const [allCategory,setAllCategory]=React.useState<allCategoryType[]>([]);
    const [generalInfo,setGeneralInfo]=React.useState<categoryGeneralInfo | null>(null);
    const [whyChooseUs,setWhyChooseUs]=React.useState<whyChoosUsType[] | null>(null);
    const [extraImages,setExtraImages]=React.useState<imageCategory[] | null>(null);
    const [termsOfService,setTermsOfService]=React.useState<catWordSnippet | null>(null);
    const [signin, setSignin] = React.useState<boolean>(false);
    const [isSignin, setIsSignin] = React.useState<boolean>(false);
    

  React.useEffect(()=>{
    
    setNavs(allNavLinks);
  },[]);

    const convertWhyChooseUs=React.useCallback((whyUs:categoryType[])=>{
        let arr:whyChoosUsType[]=[]
            whyUs.forEach((obj,index)=>{
                let getObj=icons.filter(ob=>(ob.name===obj.title))[0]
                arr.push({...obj,image:getObj.image});
            });
            return arr;
    },[]);
  //NEW----------------------/
 
  
  //*****THIS DOWNLOADS, RESUME,FAQS,WORDSNIPPETS,SERVICES DESCRIPTIONS,ETC*******//
  useEffect(() => {
    const getAllcategory = async () => {
      try {
        const res = await api.get('/category/');
        const body:allCategoryType[] = res.data;
        
        if (body && body?.length > 0) {
            setAllCategory(body);
            let generalInfor:categoryGeneralInfo | null=body.filter((obj:allCategoryType)=>(obj.name==="GeneralInfo"))[0].categoryGeneralInfo[0];
            if(generalInfor){
            setGeneralInfo(generalInfor);
            }
            let whyChooseUseTemp:categoryType[] | null= body.filter((obj)=>(obj.name==="AllServices"))[0].categories;
            
            if(whyChooseUseTemp){
                setWhyChooseUs(convertWhyChooseUs(whyChooseUseTemp));
            }
            let extraImagesTemp:imageCategory[] | null= body.filter((obj)=>(obj.name==="extraImages"))[0].imageCategory;
            
            if(extraImagesTemp){
              
                setExtraImages(extraImagesTemp);
            }
            let tempTermsOfsvc:catWordSnippet | null=body.filter((obj)=>(obj.section==="policy"))[0].catWordSnippet[0]
            if(tempTermsOfsvc){
                setTermsOfService(tempTermsOfsvc)
            }

        }
      } catch (error) {
        console.error(new Error("Did not return all categories"))
      }
    }
    getAllcategory();
  }, [convertWhyChooseUs]);


  return (
    <GeneralContextNoAcc.Provider value={{allCategory,generalInfo,whyChooseUs,extraImages,termsOfService,close,setClose,signin, setSignin,isSignin,setIsSignin}}>
    <NavContext.Provider value={{navs}}>
        {props.children}
      </NavContext.Provider>
    </GeneralContextNoAcc.Provider>
  )
}
export const ArticalContextProvider = (props:any) => {
    const [articles,setArticles]=React.useState<articlesType[]>([]);

    React.useEffect(()=>{
        const getArticles=async()=>{
            try {
                const res = await api.get("/blog/articles/");
                const body:articlesType[]= res.data;
                setArticles(body);
                // console.log(body)
            } catch (error) {
                console.error(new Error("did not return articles"))
            }
        }
        getArticles();
      },[]);
    //   console.log(articles)
    return(
        <ArticleContext.Provider value={{articles}}>
            {props.children}
        </ArticleContext.Provider>

    )
}

export const UltilsContextProvider=(props:any)=>{
    const [getCountries,setGetCountries]=React.useState<countryType[] | null>(null);
    React.useMemo(() => {
        let allCountries: countryType[] | null = countriesArr;
        setGetCountries(allCountries);
}, []);
    return(
        <UltilsContext.Provider value={{getCountries}}>
            {props.children}
        </UltilsContext.Provider>
    )
}
//-----COUNRY CONTEXT----------//
export const CountryContextProvider = (props:any) => {
    const [show,setShow]=React.useState<boolean>(false);
    const [showNative, setShowNative] = React.useState<boolean>(false);
  const [showLang, setShowLang] = React.useState<boolean>(false);
  const [showCurr, setShowCurr] = React.useState<boolean>(false);
  const [showDenom, setShowDenom] = React.useState<boolean>(false);
  return (
    <CountryContext.Provider value={{show,setShow,showNative, setShowNative,showLang, setShowLang,showCurr, setShowCurr,showDenom, setShowDenom}}>
        {props.children}
    </CountryContext.Provider>
  )
}
//------------APEXCHARTS-------------------------//
type mainGeneralApexChartType={
    // setGroupSeries: React.Dispatch<React.SetStateAction<[] | seriesType[]>>,
    // groupSeries:[] | seriesType[],
    // setSerie: React.Dispatch<React.SetStateAction<string | null>>,
    // serie: string | null,
    // setXAxis:React.Dispatch<React.SetStateAction<xaxisType | null>>,
    // xaxis: xaxisType | null,
    // setXaxisInput: React.Dispatch<React.SetStateAction<string | null>>,
    // xaxisInput: string | null,
   
    setMsgX: React.Dispatch<React.SetStateAction<string | null>>,
    msgX: string | null,
    setMsg_S: React.Dispatch<React.SetStateAction<string | null>>,
    msg_S: string | null,
    setNameS: React.Dispatch<React.SetStateAction<string | null>>,
    nameS: string | null,
    setAddSeriesCount: React.Dispatch<React.SetStateAction<number[]>>,
    addSeriesCount: number[],
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>,
    refresh: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>,
    show: boolean,
   
  }
  export const GeneralApexChart=React.createContext<mainGeneralApexChartType>({} as mainGeneralApexChartType);
  
  export const GeneralApexChartProvider=(props:any)=>{
      
      const [msgX, setMsgX] = React.useState<string | null>(null);
      const [msg_S, setMsg_S] = React.useState<string | null>(null);
      const [nameS, setNameS] = React.useState<string | null>(null);
      const [addSeriesCount, setAddSeriesCount] = React.useState<number[]>([1]);
      const [refresh, setRefresh] = React.useState<boolean>(false);
      const [show, setShow] = React.useState<boolean>(false);
      // const [graphType, setGraphType] = React.useState<graphType_type>();
      // const [barlabels, setBarlabels] = React.useState<barDataLabelType | undefined>();
    return (
      <GeneralApexChart.Provider value={{show,setShow,refresh, setRefresh,addSeriesCount, setAddSeriesCount,nameS, setNameS,msg_S, setMsg_S,msgX, setMsgX,}}>
          {props.children}
      </GeneralApexChart.Provider>
    )
  }

//------------APEXCHARTS-------------------------//
//--------COUNTRY GRAPH-----------///
type mainPopCountryType={

}
export const PopulationContext=React.createContext<mainPopCountryType>({} as mainPopCountryType)
export const PopulationContextProvider=(props:any)=>{

  return(
    <PopulationContext.Provider value={{}}>
      {props.children}
    </PopulationContext.Provider>
  )
}
//--------COUNTRY GRAPH-----------///