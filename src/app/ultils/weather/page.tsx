import Index from "@ultils/weather/Index";
import {metaweather} from '@component/metadata/metaultils';
import type {Metadata} from 'next';
export const metadata:Metadata=metaweather;

const page = () => {
  return (
    <div className="lg:container lg:mx-auto">
        <Index/>
    </div>
  )
}

export default page