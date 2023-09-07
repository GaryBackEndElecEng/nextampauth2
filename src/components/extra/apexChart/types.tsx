

export type seriesType={
    name:string,
    data:number[],
}
export type xaxisType={
    categories:string[] | number[]
}

export type xyType={
    x:number | number,
    y:number | string
}
export type series2DType={
    data:xyType[],
}
export type xaxis2DType={
    xaxis:{
        type:'numeric'
      }
}
export type graphType_type="area" | "line" | "bar" | "pie" | "donut" | "radialBar" | "scatter" | "bubble" | "heatmap" | "candlestick" | "boxPlot" | "radar" | "polarArea" | "rangeBar" | "rangeArea" | "treemap" | undefined
export type barColorType={
    ranges: [{
        from:number,
        to: number,
        color: undefined
    }],
    backgroundBarColors: [],
    backgroundBarOpacity:number,
    backgroundBarRadius: number,
}
export type BarLabelTotalType={
  enabled: boolean,
  formatter?: undefined,
  offsetX?: number,
  offsetY?: number,
  style: {
  color: string,
  fontSize: string,
  fontFamily?: undefined,
  fontWeight: number
  }
} | undefined
export type barDataLabelType={
    position?: string,
    maxItems?: number,
    hideOverflowingLabels: boolean,
    //orientation: horizontal,
    total?:BarLabelTotalType
}
export type barType={
        horizontal?: boolean,
        borderRadius?:number,
        borderRadiusApplication?: string, //'around','end
        borderRadiusWhenStacked?: string, //"last","all"
        columnWidth?: string, //"0=>100%"
        barHeight?: string, //"0=>100%"
        distributed?: boolean,
        rangeBarOverlap?: boolean,
        rangeBarGroupRows?: boolean,
        hideZeroBarsWhenGrouped?: boolean,
        isDumbbell?: boolean, //doumbellShape bar graph
        isFunnel?: boolean, // to create a funnel graph
        isFunnel3d?: boolean, //adds shading
        colors?: barColorType,
        dataLabels?:barDataLabelType
}
export type lineStrokeType = {
    show?: boolean,
    curve?: 'smooth' | 'straight' | 'stepline'|undefined | string,
    lineCap?: 'butt' | 'square' | 'round'
    colors?: string[]
    width?: number | number[]
    dashArray?: number | number[]
    
  }

export type plotOptionsType = {
    area?: {
        fillTo?: "end" | "origin" | undefined;
    } | undefined;
    bar?:barType 

}
export type ApexOptionsType={
    plotOptions?: plotOptionsType
}

export type legendType = {
    show?: boolean,
    showForSingleSeries?: boolean,
    showForNullSeries?: boolean,
    showForZeroSeries?: boolean,
    floating?: boolean,
    inverseOrder?: boolean,
    position?: 'top' | 'right' | 'bottom' | 'left',
    horizontalAlign?: 'left' | 'center' | 'right',
    fontSize?: string,
    fontFamily?: string,
    fontWeight?: string | number,
    width?: number,
    height?: number,
    offsetX?: number,
    offsetY?: number,
    formatter?(legendName: string, opts?: any): string,
    tooltipHoverFormatter?(legendName: string, opts?: any): string,
    textAnchor?: string,
    customLegendItems?: string[],
    labels?: {
      colors?: string | string[],
      useSeriesColors?: boolean
    }
    markers?: {
      width?: number,
      height?: number,
      strokeColor?: string,
      strokeWidth?: number,
      fillColors?: string[],
      offsetX?: number,
      offsetY?: number,
      radius?: number,
      customHTML?(): any
      onClick?(): void,
    }
    itemMargin?: {
      horizontal?: number
      vertical?: number
    }
    containerMargin?: {
      left?: number
      top?: number
    }
    onItemClick?: {
      toggleDataSeries?: boolean
    }
    onItemHover?: {
      highlightDataSeries?: boolean
    }
  }
