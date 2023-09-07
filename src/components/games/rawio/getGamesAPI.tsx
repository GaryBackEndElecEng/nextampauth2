
import React from 'react'

type screenShotType={
    id:number,
    image:string
}
type storeType={
    id: number,
    store: {
      id: number,
      name: string,
      slug: string,
      domain: string,
      games_count: 4760,
      image_background: string
}
}
type genresType={
    id: number,
    name: string,     
    slug: string,     
    games_count: number,
    image_background:string
}
type GameType={
    id:number,
    background_image:string,
    rating:number,
    rating_top: number,
    ratings_count: number,
    name:string,
    updated: string,
    suggestions_count:number,
    reviews_count: number,
    playtime:number,
    genres: genresType[],
    stores:storeType[],
    short_screenshots:screenShotType[]
}
const getGamesAPI =async (): Promise<GameType[]> => {
    const accessCode=process.env.NEXT_PUBLIC_rawio;
    const res = await fetch(
        `https://api.rawg.io/api/games?key=${accessCode}`
    )
    if (!res.ok){
        console.error(new Error("failed to fetch"))
    }
    const data=await res.json()
    return data.results
  
}

export default getGamesAPI
