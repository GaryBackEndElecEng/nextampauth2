"use client"
import React,{MouseEvent} from 'react';
import { TypeElement } from 'typescript';
import Image from "next/image";
import SubPopUpStore from "./SubPopUpStore";
import SubGenresPopUp from './SubGenresPopUp';

type screenShotType = {
  id: number,
  image: string
}
type genresType = {
  id: number,
  name: string,
  slug: string,
  games_count: number,
  image_background: string
}
type storeType = {
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
type dialogType = {
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
type setShowGameType={
  loaded:boolean,
  game:dialogType |null
}
type dialogTypeMain={
  showGame:dialogType,
  setClose:React.Dispatch<React.SetStateAction<boolean>>,
  setShowGame: React.Dispatch<React.SetStateAction<setShowGameType>>
}

const DialogPopUp = ({ showGame,setShowGame,setClose}: dialogTypeMain) => {
  const handleClose=(e:MouseEvent<HTMLButtonElement> | undefined)=>{
    e?.preventDefault();
    setClose(true);
    setShowGame({loaded:false,game:null})
  }


  return (
    <section className="container mx-auto">
      <dialog id="dialogId" className="m-auto flex flex-col justify-center items-center">
          <div className="mx-auto flex flex-col justify-center align-center">
            <h6 className="mx-auto text-3xl mb-5 text-center">{showGame.name}</h6>
            <div className="flex flex-row flex-wrap justify-center items-center gap-1">
              <div className="my-auto text-center"><span className="font-bold">rating:</span>{showGame.rating}, </div>
              <div className="my-auto text-center"><span className="font-bold">highest rating:</span>{showGame.rating_top}, </div>
              <div className="my-auto text-center"><span className="font-bold">totale count:</span>{showGame.ratings_count}, </div>
            </div>
            <small className="text-center m-auto"><span className="font-bold">updated:</span> {showGame.updated} </small>
            <div className="flex flex-row flex-wrap justify-center items-center">
              <div className="m-auto text-center"><span className="font-bold">views:</span>{showGame.suggestions_count}, </div>
              <div className="m-auto text-center"><span className="font-bold">highest rating:</span>{showGame.reviews_count}, </div>
            </div>
            <div className="text-lg text-center"> <span className="font-bold">play length:</span>{showGame.playtime} mins</div>
            <SubGenresPopUp genres={showGame.genres} />
            <SubPopUpStore stores={showGame.stores} />
            <h3 className="text-2xl text-center font-bold">Screen Shots</h3>
            <ul className="m-auto grid grid-cols-1 place-items-center p-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
              {showGame.short_screenshots && showGame.short_screenshots.map((screen, index) => (
                <Image
                  key={`${screen.id}-screen-${index}`}
                  src={screen.image}
                  alt={`www.masterconnect.ca-${screen.id}`}
                  width={350}
                  height={350}
                  className="object-fit rounded-ml aspect-video"
                />
              ))}
            </ul>
          </div>

          
          <div>
              <button className="button" id="openDialog" onClick={(e) => handleClose(e)}>close</button>
          </div>
        

      </dialog>
    </section>
  )
}

export default DialogPopUp