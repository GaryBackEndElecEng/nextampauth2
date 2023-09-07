import ArticlesMain from '../../components/articles/ArticlesMain';
import type {Metadata} from 'next';
import {metaarticles} from "@component/metadata/metaarticles";

export const metadata:Metadata=metaarticles;

const page = () => {
  return (
    <div className="lg:container lg:mx-auto">
        <ArticlesMain/>
    </div>
  )
}

export default page