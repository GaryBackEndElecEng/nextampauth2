

export type countryType={
    countryCode: string,
    countryName: string,
    currencyCode: string,
    population: string,
    capital: string,
    continentName: string
}
export type xaxisType={
    categories:string[]
}
export type chartType={
    id:string
}
export type optionsType={
    chart:chartType,
    xaxis:xaxisType
}
export type seriesType={
    name:string,
    data:number[]

}[]

export type barType={
    horizontal?: boolean,
    borderRadius?:number,
    borderRadiusApplication?: string, //'around','end
    borderRadiusWhenStacked?: string, //"last","all"
    columnWidth?: string, //"0=>100%"
    barHeight?: string, //"0=>100%"
    distributed?: boolean,
    
    
}
export type plotOptionsType = {
    area?: {
        fillTo?: "end" | "origin" | undefined;
    } | undefined;
    bar?:barType 

}
export type titleType={
    
        text?: string
        offsetX?: number
        offsetY?: number
        style?: {
          color?: string
          fontFamily?: string
          fontWeight?: string | number
          fontSize?: string
          cssClass?: string
        }
      
} | undefined

export type topTenType={
    id:number,
    name:string,
    pop:number
}