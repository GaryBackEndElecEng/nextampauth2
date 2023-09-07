import React from 'react';

export type paraType={
    para:string
}
export type navImageLinkType = {
    id:number,
    image: string,
    link:string,
    icon:React.ReactElement<any, any>,
    name: string,
    desc:paraType[]
  }
export type navGamesType = {
    id:number,
    name: string,
    link: string,
    image: string,
    desc:string[]
  }
export type navAllType = {
    id:number,
    name: string,
    link: string,
    image: string,
    icon:React.ReactElement<any, any>,
    desc:string[]
  }
export type whyChoosUsType={
    id: number,
    title: string,
    section:string,
    subSection: string,
    content:string,
    summary:string,
    image:string
}
export type categoryType={
    id: number,
    title: string,
    section:string,
    subSection: string,
    content:string,
    summary:string
}
export type catWordSnippet={
    id: number,
    title: string,
    sectionTitle: string,
    subSectionTitle:string,
    content:string,
    content1: string,
    content2: string,
    content3: string,
    webImage: string
}
export type categoryGeneralInfo={
    id: 2,
    name: string,
    address: string,
    cell: string,
    country: string,
    provState: string,
    city: string,
    postal: string,
    extra: string,
    siteArray: string[]
}
export type categorySponsor={

}
export type imageCategory={
    id: number,
    name: string,
    image: string
}
export type pageFeedback={
    id: number,
    name: string,
    email: string,
    page: string,
    comment: string,
    rating: number,
    pageCount: number,
    average: number,
    category: number
}
export type allCategoryType={
    id: number,
    name: string,
    section: string,
    categories: categoryType[],
    catWordSnippet: catWordSnippet[],
    categoryGeneralInfo:categoryGeneralInfo[],
    categorySponsor: categorySponsor[],
    imageCategory: imageCategory[],
    pageFeedback: pageFeedback[]
}
export type articleType={
    id:number,
    section:string,
    imageSection:string,
    summary:string,
    subSection:string,
    content:string,
    subSection1:string,
    content1:string,
    subSection2:string,
    content2:string,
    date:string
}
export type articlesType={
    id:number,
    article:articleType[],
    title:string

}
export type countryType = {
    countryCode: string,
    countryName: string,
    currencyCode: string,
    population: string,
    capital: string,
    continentName: string
}
export type codeCoNameType = {
    id: number,
    code: string,
    name: string
}
export type userType={
    id:number,
    name?:string,
    email:string,
    password:string
}
export type DataType ={
    id: number;
    title: string ;
    content: string ;
    published?: boolean;
    userId: number;
    
    
  }[]
export type PostDataType ={
    id: number;
    title: string ;
    content: string;
    published?: boolean;
    userId: number;
    
  }
export type loginType={
    email:string,
    password:string
}
export type adminType={
    email:string,
    name?:string
}
export type loginTypedata={
    data:{email:string,
    password:string
    }
}
export type userTypeData={
    data:{
    name:string,
    email:string,
    password:string
    }
}
export type msgType={
    loaded:boolean,
    msg:string | null
}
export type userAccountType={
    loaded:boolean,
    data:{
      id:number,
    name:string | undefined,
    email:string | undefined,
    status: "loading" | "authenticated" | "unauthenticated"
    } | null
  }