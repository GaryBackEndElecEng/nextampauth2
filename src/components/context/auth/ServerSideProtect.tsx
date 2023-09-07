import {getServerSession} from "next-auth";
import authOptions from "@context/options";
import {redirect} from "next/navigation";


const ServerSideProtect = async () => {
    const session= await getServerSession(authOptions);

    if(!session){
      redirect("/api/auth/signin")
    }else{
      return(
          <div className="flex flex-col p-10 mx-auto container">
              <h3 className="text-center text-xl m-auto">This is the page</h3>
             {session &&
              <div className="flex flex-col justify-center items-center">
              <h3 className="text-center text-xl m-auto">{session?.user?.name}</h3>
              <h3 className="text-center text-xl m-auto">{session?.user?.email}</h3>
              <h3 className="text-center text-xl m-auto">{session?.expires}</h3>
              
              </div>
              }
          </div>
      )
    }
}

export default ServerSideProtect