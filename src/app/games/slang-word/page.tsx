
import Slang from '@games/slang-word/Slang';
import {metaslang} from '@component/metadata/metagames';
import type {Metadata} from 'next';
export const metadata:Metadata=metaslang;

const page = () => {
    
    return (
        <div className="lg:mx-auto lg:container">
                <Slang/>
        </div>
    )
}

export default page