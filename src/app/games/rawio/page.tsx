import GetGames from '@games/rawio/GetGames'
import {metarawio} from '@component/metadata/metagames';
import type {Metadata} from 'next';
export const metadata:Metadata=metarawio;

const page = () => {
  return (
    <div className=" m-0 flex flex-col items-center lg:mx-auto lg:container">
        <GetGames/>
    </div>
  )
}

export default page