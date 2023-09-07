

export type languageType={
    official: string,
     common: string
}
 export type translationType={
    ces:languageType,
    deu:languageType,
    est:languageType,
    fin:languageType,
    fra:languageType,
    hrv:languageType,
    ita:languageType,
    jpn:languageType,
    per:languageType,
    pol:languageType,
    por:languageType,
    rus:languageType,
    slk:languageType,
    spa:languageType,
    urd:languageType,
    zho:languageType
}
type AWGType={
    name:string,
    symbol:string
}
type currencyType={
    AWG:AWGType,
    HRK:AWGType,
    HTG:AWGType,
    HUF:AWGType,
    IDR:AWGType,
}
 type demonType={
    f:string,
    m:string
}
export type demonymsType ={
    [key:string]:{f:string,m:string},
    
}
export type iddType ={
    root:string,
    suffixes:string[],
}
type languagesType={
nld: string,
pap: string,
hrv:string,
hat:string,
hun:string,
ind:string,
}
type nativeType={
    nld:{official:string,common:string},
    pap:{official:string,common:string},
    hrv:{official:string,common:string},
    hat:{official:string,common:string},
    hun:{official:string,common:string},
    ind:{official:string,common:string},
}
export type countrycurrType={
    [key:string]:{name:string,symbol:string}
}
type nameType={
     common: string,
      official: string,
      native:object
}

export type classNamesType={
  altSpellings: string[],
  area:number,
  borders: string[],
  capital: string[],
  cca2: string,
  cca3: string,
  ccn3: string,
  cioc: string,
  currencies:currencyType,
  demonyms:demonymsType,
  flag:string,
  idd: iddType,
  independent: false,
  landlocked: false,
  languages:object,
  latlng:number[],
  name:nameType,
  region: string
  status: string,
  subregion: string,
  tld:string[],
  translations:translationType,
 
}
export type getCountriesType={
    countryCode: string,
    countryName: string,
    currencyCode: string,
    population: string,
    capital: string,
    continentName: string
}