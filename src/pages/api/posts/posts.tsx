
import type {NextApiRequest,NextApiResponse} from 'next';
import prisma from "@_prisma/client";
import type {DataType,userType,PostDataType,answerType} from "@component/context/type";


type messageType={
  message:string
}

 export function convert(id:string | string[] |undefined):string | undefined{
  if(typeof(id)==="string"){
    return id
  }else if(typeof(id)==="string" && id[1]){
    let conv=id[1]
    return conv
  }else{
    return
  }
  
}
 export function convertPost(id:string | string[] |undefined):number | undefined{
  if(typeof(id)==="string"){
    return parseInt(id)
  }else if(typeof(id)==="string" && id[1]){
    let conv=id[1]
    return parseInt(conv)
  }else{
    return
  }
  
}

export default async function handle(req:NextApiRequest, res:NextApiResponse) 
{
  const {postId,userId}=req.query;
  const getPostId:number | undefined= convertPost(postId);
  const getUserId: string | undefined= convert(userId);

  if(req.method==="GET" && !getPostId && !userId)
  {
   
    try {
      const data = await prisma.post.findMany({
        include:{
          answers:true
        }
      })
      res.status(200).json(data)
      prisma.$disconnect()
      
    } catch (error) {
      res.status(404).json({message:"did not get, not found"})
    }
  }

  if(getPostId && getUserId)
  {
    
    try {
        const deleteRec = await prisma.post.delete({
          where:{
            id:getPostId,
            userId:getUserId
            
          },
          include:{
            answers:true
          }
        });
        res.status(200).json(deleteRec);
      prisma.$disconnect();
    } catch (error) {
      res.status(400).json({message:"could not find"})
    }
  }
  
  

  
}

