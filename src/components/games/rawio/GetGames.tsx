"use client";
import React,{MouseEvent} from 'react';
// import {ThemeProvider} from 'next-themes';
import Image from "next/image";
import DialogPopUp from './DialogPopUp';
import getGamesAPI from './getGamesAPI';

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

const GetGames=()=>{
const [games,setGames]=React.useState<GameType[] | null>(null)
const [show,setShow]=React.useState<{loaded:boolean,game:GameType |null}>({loaded:false,game:null});

const [close,setClose]=React.useState<boolean>(false)

React.useMemo(async()=>{
    const get_games:GameType[] | null= await getGamesAPI();
        setGames(get_games)
    // console.log("get_games",get_games)
},[]);
// console.log(games)

const handleGame=(e:MouseEvent<HTMLButtonElement> | undefined,game:GameType)=>{
    e?.preventDefault();
    setClose(false);
    if(!show.loaded){
        setShow(
            {
                loaded:true,
                game:game
            }
        )
        
    }else{
        setShow({loaded:false,game:null})
    }

}
    return (
        // <ThemeProvider attribute="class">
        <main className="mx-auto lg:container  my-2 dark:bg-black dark:text-white bg-white text-black ">
        <section className="m-1 relative rounded-md grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-4 m-0 grid-flow-row-dense justify-items-center justify-center">
            {games && games.map((game,index)=>(
                <div  key={`${game.id}--${index}`}>
                <div className="m-auto auto-cols-auto p-1" key={`${game.id}--${index}`}>
                    <h1>{game.name}</h1>
                    <p className="font-bold text-sm mb-4"> Rating:Put Stars!={game.rating}</p>
                    <Image 
                    src={game.background_image}
                    // fill
                    width={600}
                    height={600}
                    className="object-cover rounded-md aspect-video"
                    alt={`www.masterconnect-${game.name}`}
                    />
                    
                </div>
               <button className="button-one mx-auto my-2" onClick={(e)=>handleGame(e,game)}>detail:{game.name}</button>
               {(show.loaded && show.game && !close) &&
                    <section className="mx-auto my-2 flex flex-col items-center justify-start absolute top-0 lg:top-[10%] left-0 w-full h-screen overflow-y-scroll lg:left-[10%] lg:w-3/4">
                    <DialogPopUp
                    showGame={show.game}
                    setShowGame={setShow}
                    setClose={setClose}
                    />
                    </section>
                    }
                </div>
                
            ))}
        </section>
        
        </main>
        // </ThemeProvider>
    )
}

export default GetGames