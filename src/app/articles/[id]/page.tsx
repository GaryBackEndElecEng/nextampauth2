"use client";
import  {useParams} from 'next/navigation';
import MainArticle from "../../../components/articles/MainArticle";

const PageArticle = () => {
    const router:any =useParams();
    const {id}=router;
    const getId:string=id


  return (
    <MainArticle id={getId && getId}/>
    
  )
}

export default PageArticle