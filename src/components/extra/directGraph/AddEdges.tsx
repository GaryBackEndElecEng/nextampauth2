"use client";
import React,{MouseEvent} from 'react'
import { attribute as _, Digraph, toDot,Subgraph,Node,Edge } from 'ts-graphviz';
import {Grid,Container,Input,FormControl,FormHelperText,InputLabel} from '@mui/material';
type attributeType={
    [_.label]:string,
    [_.color]:string,
}
type edgeType={
    name:string,
    edge:Edge,
    nodeArray:string[],
    label:string
    
}
type nodeType={
    name:string,
    addNode:Node,
    nodeName:string
}
type mainEdgeType={
    setEdgeArr:React.Dispatch<React.SetStateAction<[] | edgeType[]>>,
    edgeArr:edgeType[] | [],
    nodeArr:nodeType[]|[],
    subGraphLabel:string |null,
}
function makeTupple(str1:string,str2:string):any{
    let tempArr:[string,string]=[str1,str2];
    return tempArr;
};
const AddEdges = ({edgeArr,setEdgeArr,nodeArr,subGraphLabel}:mainEdgeType) => {
    const [addEdge,setAddEdge]=React.useState<edgeType | null>(null);
    const [nodeNameFrom,setNodeNameFrom]=React.useState<string | null>(null);
    const [nodeNameTo,setNodeNameTo]=React.useState<string | null>(null);
    const [nodeEdgeArr,setNodeEdgeArr]=React.useState<string[] |[] >([])
    const [label,setLabel]=React.useState<string|null>(null);
    const [color,setColor]=React.useState<string >("blue");

    React.useMemo(()=>{
        if(addEdge ){
            setEdgeArr([...edgeArr,addEdge]);
            
        }
    },[addEdge]);

    
// console.log("addEdges",edgeArr)//works
    const handleAddNodeEdge=(e:MouseEvent<HTMLButtonElement> | undefined)=>{
        e?.preventDefault();
        if(nodeNameFrom && nodeNameTo && subGraphLabel && label){
            let tempEdge=[...nodeEdgeArr,nodeNameFrom,nodeNameTo];
            let targets=makeTupple(nodeNameFrom,nodeNameTo)
            let node1=nodeArr.filter(node=>(node.nodeName===nodeNameFrom))[0].addNode;
            let node2=nodeArr.filter(node=>(node.nodeName===nodeNameTo))[0].addNode;
            setNodeEdgeArr(tempEdge);
            setAddEdge({
                nodeArray:targets,
                name:subGraphLabel,
                label:label,
                edge:new Edge([node1,node2],{[_.label]:label,[_.color]:color}),
               
            });
           
        }

    }
    
  return (
    <div className="flex flex-col items-center justify-center my-2 mx-auto w-full dark:bg-black dark:text-white">
    <form className="flex flex-col items-center justify-center w-full">
        <FormControl className="mx-auto w-full my-2 dark:bg-white dark:text-black">
        <InputLabel htmlFor="addEdgeLabel" className="my-2">add edge label</InputLabel>
        <Input
        id="addEdgeLabel"
        name="addEdgeLabel"
        value={label ? label : ""}
        onChange={(e)=>setLabel(e.target.value)}
         />
        </FormControl >
        <FormControl className="mx-auto w-full my-2 dark:bg-white dark:text-black">
        <InputLabel htmlFor="addEdgeColor" className="my-2">add edge color</InputLabel>
        <Input
        id="addEdgeColor"
        name="addEdgeColor"
        value={color}
        onChange={(e)=>setColor(e.target.value)}
        className="dark:bg-white dark:text-black"
         />
        </FormControl>
        <FormControl className="mx-auto w-full my-2 dark:bg-white dark:text-black">
        <InputLabel htmlFor="addEdgeFrom" className="my-3">edge from node</InputLabel>
        <select
        name={"addEdgeFrom"}
        placeholder="enter flow direction"
        onChange={(e)=>setNodeNameFrom(e.target.value)}
        className="my-4 w-1/4 dark:bg-white dark:text-black"
        >
            <option disabled>select value</option>
        {nodeArr.length>0 && nodeArr.map((nodeObj,index)=>(
            <option key={index} value={nodeObj.nodeName}>{nodeObj.nodeName}</option>
        ))}
        
        </select>
        <FormHelperText className="dark:bg-white dark:text-black">select node 2 then node1 to start</FormHelperText>
        </FormControl>
        <FormControl className="mx-auto w-full my-2 dark:bg-white dark:text-black">
        <InputLabel htmlFor="addEdgeTo" className="my-3">edge To node</InputLabel>
        <select
        name={"addEdgeTo"}
        placeholder="enter flow direction"
        onChange={(e)=>setNodeNameTo(e.target.value)}
        className="my-3 w-1/4 dark:bg-white dark:text-black"
        >
            <option disabled>select value</option>
        {nodeArr.length>0 && nodeArr.map((nodeObj,index)=>(
            <option key={index} value={nodeObj.nodeName}>{nodeObj.nodeName}</option>
        ))}
        </select>
        <button className="button button my-4 cursor-pointer text-center"onClick={(e)=>handleAddNodeEdge(e)}>add arrow to arrows</button>
        </FormControl>
    </form>
    <div className="m-auto flex flex-col items-center justify-start h-[15vh] overflow-y-scroll w-full border rounded-lg shadow-lg dark:bg-black dark:text-white">
    {edgeArr.length>0 && edgeArr.map((edge,index)=>(
        <Grid container spacing={{xs:0,sm:0}} key={index}>
            <Grid item  xs={12} sm={6} >
                <h6 className="text-lg text-center m-auto">
                    edge parent:{edge.name}
                </h6>
            </Grid>
            <Grid item  xs={12} sm={6} >
                <h6 className="mx-1 text-lg text-center">edge Label:{edge.label}</h6>
            </Grid>
        </Grid>
        ))}
    </div>
    </div>
  )
}

export default AddEdges