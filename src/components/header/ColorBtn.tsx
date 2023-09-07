
import React, {MouseEvent} from 'react';
// import {useTheme} from 'next-themes';
import {Switch} from '@mui/material';

const ColorBtn = () => {
    // const {theme,setTheme}=useTheme();
    const [bool,setBool]=React.useState<boolean>(false);
    
    // React.useEffect(()=>{
    //     if(bool){
    //         setTheme("dark");
    //     }else{
    //         setTheme("light");
    //     }
        
    // },[bool,setTheme]);


  return (
    <div className="flex flex-col items-center absolute -right-2 top-[15%] sm:right-2 sm:top-[17%] lg:right-10 lg:top-3  shadow shadow-blue rounded-lg transform scale-[70%] sm:scale-[100%]" style={{zIndex:"3000"}}>
        <Switch checked={bool} onChange={(e)=>setBool(e.target.checked)}
        className={"bg-white dark:bg-black rounded-lg"}
        style={{color:"blue"}}
        />
        {bool ?
        <h6 className="text-md text-center dark:bg-black dark:text-white shadow-lg shadow-blue m-2 p-1 rounded-lg">black</h6>
        :
        <h6 className="text-lg text-center bg-white text-black shadow-lg shadow-blue m-2 p-1 rounded-lg">white</h6>
        }
    </div>
  )
}

export default ColorBtn