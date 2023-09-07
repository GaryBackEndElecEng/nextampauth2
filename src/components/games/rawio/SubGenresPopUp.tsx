"use client";
import React from 'react'
import Image from 'next/image';

type genresType={
    id: number,
    name: string,     
    slug: string,     
    games_count: number,
    image_background:string
  }
const SubGenresPopUp = ({genres}:{genres:genresType[]}) => {
  return (
    <div>
        <h3 className="text-center text-xl font-bold mx-auto my-2 p-1">Genres</h3>
    <ul className="grid grid-cols-1 place-items-center sm:grid-cols-2 grid-flow-row-dense">
      {genres && genres.map((genre,index)=>(
        <div className="auto-cols-auto p-1" key={`${genre.id}-genre-${index}`}>
          <h6 className="m-auto text-center text-4md">{genre.name}</h6>
            <Image 
            src={genre.image_background}
            alt={`www.masterconnect.ca-${genre.slug}`}
            width={600}
            height={600}
            // fill
            className="object-fit aspect-video rounded-ml"
            />
            <small>games count: {genre.games_count}</small>
        </div>
      ))}
    </ul>
    </div>
  )
}

export default SubGenresPopUp