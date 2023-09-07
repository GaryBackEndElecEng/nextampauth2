import Index from "@ultils/translate/Index";
import {metatranslate} from '@component/metadata/metaultils';
import type {Metadata} from 'next';
export const metadata:Metadata=metatranslate;

const page = () => {
  return (
    <div className="lg:mx-auto lg:container">
        <Index/>
    </div>
  )
}

export default page