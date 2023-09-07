"use client";
import React,{MouseEvent} from 'react';
import {FormControl,FormHelperText,InputLabel,Input,Checkbox} from "@mui/material";

type dataSetType={
    label:string,
    data:number[],
    fill:boolean,
    borderColor:string
}

function convertLabs(labels:string){
    if(labels){
        let check1:boolean =labels.includes('[') ? true:false;
        let check2:boolean=labels.includes(']') ? true:false;
        let arr:string[]=[]
        switch(check1 && check2){
            case (check1 && check2):
                // console.log("here1",check1 && check2)//good
            arr=labels.split('[')[1].split("]")[0].split(",");
            // console.log(arr)//good
            break;
            case (check1 && !check2):
                // console.log("here1",check1 && !check2)
            arr=labels.split('[')[1].split(",");
            break;
            case (!check1 && check2):
                // console.log("here1",!check1 && check2)
            arr= labels.split('[')[1].split(",");
            break;
            default:
                arr=labels.split(",")
            return arr;
        }
        return arr
    }
}
function convertArrToNums(arr:string[]):number[]{
    let numArr:number[]=[];
    // console.log("arr",arr)//good
    if(arr.length>0){
        arr.forEach(str=>{
            numArr.push(parseInt(str));
        });
    }
    return numArr
   
}

type dataSetMain={
    setDataset: React.Dispatch<React.SetStateAction<dataSetType | null>>,
    dataset: dataSetType | null,
    addToArray:boolean

}
const Dataset = ({dataset,setDataset,addToArray}:dataSetMain) => {
    const [convertLabels,setConvertLabels]=React.useState<string>("");
    const [convertData,setConvertData]=React.useState<string >("");
    const [dataArray,setDataArray]=React.useState<number[] | null>(null);
    const [labelTitle,setLabelTitle]=React.useState<string>("Title here");
    const [borderColor,setBorderColor]=React.useState<string>("blue");
    const [fill,setFill]=React.useState<boolean>(false);

    React.useEffect(()=>{
        if(addToArray){
            setDataArray(null);
            setFill(false);
            setBorderColor("red");
            setLabelTitle("insert Title");
            setConvertData("");
            // console.log("addToArray",addToArray)
        }
    },[addToArray]);

    function mainArrToNum(labels:string):void{
        let arr:number[]=[];
        let convertLabel=convertLabs(labels);
        // console.log("convertLabel",convertLabel)
        if(convertLabel){
         arr=convertArrToNums(convertLabel);
         setConvertData(labels);
        //  console.log(arr);//works
         setDataArray(arr);
        }
        
    }


React.useMemo(()=>{
if(dataArray){
    // console.log(dataArray)//works
    let temp:dataSetType={data:dataArray,borderColor:borderColor,fill:fill,label:labelTitle};
        setDataset(temp);
        // console.log("temp",temp)//works
}else{
    // setDataset(null);
}

},[dataArray,fill,borderColor,labelTitle,setDataset]);
   

    const handleConvert=(bool:boolean)=>{
            setFill(bool);
    }

    const handledataset=(e:MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        if(convertData){
            // console.log("clicked",convertData)
            mainArrToNum(convertData)
        }
    }
// console.log(dataArray)
  return (
    <div className="m-auto flex flex-col w-full justify-center items-center bg-white rounded-lg shadow-xl shadow-white py-3">
        <FormControl className="my-2 w-full lg:w-1/2">
            <InputLabel htmlFor="label" shrink={true} className="my-2"> Title</InputLabel>
                <Input 
                type="text"
                placeholder="graphs border color"
                id="label"
                name={"label"}
                value={labelTitle}
                onChange={(e)=>setLabelTitle(e.target.value)}
                className="bg-white text-black dark:bg-white dark:text-black"
                style={{color:"black"}}
                />
                <FormHelperText className="bg-white text-black dark:bg-white dark:text-black"> Graph&#39;s Title</FormHelperText>
        </FormControl>
        <FormControl className="my-2 w-full lg:w-1/2 dark:bg-white dark:text-black">
            <InputLabel htmlFor="borderColor" shrink={true} className="my-2"> border color
            </InputLabel>
                <Input 
                type="text"
                placeholder="graphs border color"
                id="borderColor"
                name="borderColor"
                value={borderColor}
                onChange={(e)=>setBorderColor(e.target.value)}
                style={{color:"black"}}
                className="bg-white text-black dark:bg-white dark:text-black"
                />
        </FormControl>
        <FormControl className="my-4">
            <h3 className="text-lg mx-auto my-1 text-center">enter data array</h3>
                <textarea
                id="dataArray"
                placeholder="[50,20,,,]"
                 rows={4}
                 cols={30}
                 name="convertData"
                 value={convertData}
                 onChange={(e)=>setConvertData(e.target.value)}
                 style={{color:"black"}}
                 className="bg-white text-black dark:bg-white dark:text-black"
                />
                <FormHelperText>This form:[number1,number2,number3,,,]</FormHelperText>
            </FormControl>
        <FormControl>
            <InputLabel htmlFor="fill" shrink={true} className="my-2"> fill graph?</InputLabel>
            <Checkbox
                name="fill"
                checked={fill}
                onChange={(e)=>handleConvert(e.target.checked)}
                style={{color:"black"}}
            />
            <FormHelperText className="mt-5">graph to be filled?</FormHelperText>
        </FormControl>
        <button className="button m-auto my-2" onClick={(e)=>handledataset(e)}
        style={{color:"black"}}>data set complete?</button>
    </div>
  )
}

export default Dataset