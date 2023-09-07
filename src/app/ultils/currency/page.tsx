import Index from "@ultils/currency/Index";
import {metacurency} from '@component/metadata/metaultils';
import type {Metadata} from 'next';
export const metadata:Metadata=metacurency;

const page = () => {
  return (
    <div className="lg:container lg:mx-auto">
        <Index/>
    </div>
  )
}

export default page