import WebToons from '@games/webtoon/WebToons';
import {metawebtoon} from '@component/metadata/metagames';
import type {Metadata} from 'next';
export const metadata:Metadata=metawebtoon;

const page = () => {
  return (
    <div className="lg:mx-auto lg:container">
        <WebToons/>
    </div>
  )
}

export default page