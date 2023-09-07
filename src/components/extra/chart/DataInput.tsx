"use client";
import React,{MouseEvent} from 'react'
import {FormControl,FormHelperText,InputLabel,Input} from "@mui/material";
import Dataset from "./Dataset";

const charttypes=[
    {type:"line"},
    {type:"bar"},
    {type:"radar"},
    {type:"pie"},
    {type:"donut"},
]
type dounutlabelItemType={
    text:string,
    font:{
        size:number
    }
}

type dounutType={
    labels:dounutlabelItemType[]
}

type dataSetType={
    label:string,
    data:number[],
    fill:boolean,
    borderColor:string
}
type dataType={
    type:string,
    data:{
        labels:string[],
        datasets:dataSetType[] |null |undefined,
    },
    options?:{
        plugins:{
            doughnutLabel:{
                labels:dounutType
            }
        }
    }
}
type dataInputType={
    setGraphData:React.Dispatch<React.SetStateAction<dataType | null>>,
    graphData:dataType | null,
    setSummary: React.Dispatch<React.SetStateAction<string>>,
    summary:string,
    setName: React.Dispatch<React.SetStateAction<string>>,
    name:string,
   setDatasetArr: React.Dispatch<React.SetStateAction<[] | dataSetType[]>>,
   datasetArr: [] | dataSetType[],
   dataset:dataSetType |null,
   setDataset: React.Dispatch<React.SetStateAction<dataSetType | null>>,
   setLabels:React.Dispatch<React.SetStateAction<string[] | []>>
   labels:string[] |[]

}
function convertLabs(labels:string){
    if(labels){
        let check1:boolean=labels.includes('[') ? true:false;
        let check2:boolean=labels.includes(']') ? true:false;
        let arr:string[]=[]
        switch(check1 && check2){
            case (check1 && check2):
            arr=check1 ? labels.split('[')[1].split("]")[0].split(","):[];
            return arr;
            case (check1 && !check2):
            arr=check1 ? labels.split('[')[1].split(","):[];
            return arr;
            case (!check1 && check2):
            arr=check2 ? labels.split(']')[0].split(","):[];
            return arr;
            default:
                arr=labels.split(",")
            return arr;
        }
    }
}


const DataInput = ({setGraphData,graphData,setSummary,summary,setName,name,setDatasetArr,datasetArr,dataset,setDataset,setLabels,labels}:dataInputType) => {
    const [type,setType]=React.useState<string>("bar");
    const [convertLabels,setConvertLabels]=React.useState<string>("");
    const [fill,setFill]=React.useState<boolean>(false);
    const [addToArray,setAddToArray]=React.useState<boolean>(false);

    const updateDataSet= React.useCallback((arr:dataSetType[])=>{
        setDatasetArr(arr);
    },[setDatasetArr]);

    const returnDataset=React.useCallback((dataset:dataSetType | null)=>{
        if(dataset && addToArray){
        //    console.log("DATA IMPUT-dataset added",dataset,"dataset.data",dataset.data)//works
        let arr=[...datasetArr,dataset]
           setTimeout(()=>{setAddToArray(false)},1000);
           updateDataSet(arr);
           return [...datasetArr,dataset]
        }
    },[addToArray,datasetArr,updateDataSet]);

    

    React.useMemo(()=>{
        if(convertLabels){
            //spliting "["one","two","three",,,]
           let converted=convertLabs(convertLabels)
           
           if(converted){
            setLabels(converted)
           }
        }
    },[convertLabels,setLabels]);

    // console.log("datasetArr IN DATAINPUT",datasetArr,"dataset",dataset)


    const handleSubmit=(e: MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        // console.log("outside")
        const getArr=dataset && returnDataset(dataset);
        setAddToArray(true)
        if(datasetArr && labels){
            // console.log("inside",datasetArr)
            setGraphData(
                {
                type:type,
                data:{
                    labels:labels,
                    datasets:getArr
                    }
                }
                )
                
                
        }
    }

  return (
    
       
        <form action="" className="m-auto flex flex-col dark:bg-black dark:text-white items-center justify-center m-1 p-1 py-5 mt-0 w-full ">
        <fieldset className="w-full  mx-auto border border-white rounded-lg dark:bg-black dark:text-white bg-black text-black m-2 p-3 py-[1rem] border border-green flex flex-col items-center justify-center">
            <legend className="text-white mb-5 text-xl leading-10">create your own graph</legend>
            <FormControl className="my-2 mx-auto  w-full lg:w-1/2 relative">
                <h6  className="absolute left-[30%] top-[-6%] "
                style={{color:"blue"}} >graph type</h6>
                <select
                    name="graphType"
                    id="graphType"
                    value={type }
                    onChange={(e)=>setType(e.target.value)}
                   style={{color:"black",background:"white"}}
                   className="bg-white text-black"
                >
                    {charttypes.map((type,index)=>(
                        <option value={type.type} key={index}>{type.type}</option>
                    ))}
                    </select>
            </FormControl>
            
            <FormControl className="my-2">
                <h3 className="text-lg mx-auto my-1 text-center">enter your summary</h3>
                <textarea
                id="summary"
                placeholder="summary of the graph"
                 rows={4}
                 cols={30}
                 name="summary"
                 value={summary}
                 onChange={(e)=>setSummary(e.target.value)}
                 className="bg-white text-black dark:bg-white dark:text-black p-2"
                 style={{color:"black"}}
                />
                <FormHelperText> Graph&#39;s description</FormHelperText>
            </FormControl>
            
            <FormControl className="my-2 w-full lg:w-1/2">
                <h3 className="text-lg mx-auto my-1 text-center">enter labels array</h3>
                <textarea
                id="labelArray"
                placeholder="[label,label2,,,,,,]"
                 rows={4}
                 cols={30}
                 name="labels array"
                 value={convertLabels}
                 onChange={(e)=>setConvertLabels(e.target.value)}
                 className="bg-white text-black p-2"
                />
                <FormHelperText>This form:[label1,label2,label3,,,]</FormHelperText>
            </FormControl>

                            {/* DATASET ELEMENT */}
            
            <Dataset 
            dataset={dataset}
             setDataset={setDataset} 
            addToArray={addToArray}
            />

            <FormControl className="my-2 w-full lg:w-1/2 bg-white rounded-lg shadow-md shadow-white flex flex-col items-center mx-auto">
                <InputLabel htmlFor="name" shrink={true} className="my-2 mx-auto">enter name</InputLabel>
                    <Input 
                    type="name"
                    placeholder="name generated by who for legend"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    className={"bg-white text-black mx-auto"}
                    />
            </FormControl>
            <div className="my-2 container mx-auto flex flex-col items-center dark:text-white text-white">
                <button className="button my-1" type="submit" onClick={(e)=>handleSubmit(e)}>
                        submit
                </button>
            </div>
            </fieldset>
        </form>
       
    
  )
}

export default DataInput