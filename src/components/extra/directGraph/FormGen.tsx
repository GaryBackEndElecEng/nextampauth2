"use client";
import React,{MouseEvent} from 'react';
import { attribute as _, Digraph, toDot,Subgraph,Node,Edge } from 'ts-graphviz';
import {Grid,Container,Input,FormControl,FormHelperText,InputLabel} from '@mui/material';
import AddEdges from './AddEdges';

type nodeType={
    name:string,
    addNode:Node,
    nodeName:string
}
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
type formGeneralType={
    setSubGraphLabelArr:React.Dispatch<React.SetStateAction<string[] | []>>,
    subGraphLabelArr:string[]|[],
    setNodeArr: React.Dispatch<React.SetStateAction<[] | nodeType[]>>,
    nodeArr:nodeType[],
    setEdgeArr: React.Dispatch<React.SetStateAction<[] | edgeType[]>>,
    edgeArr:edgeType[]
}

const FormGen = (
    {
        subGraphLabelArr,
        setSubGraphLabelArr,
        nodeArr,
        setNodeArr,
        edgeArr,
        setEdgeArr

    
    }:formGeneralType) => {
    const [count,setCount]=React.useState<number>(1);
    const [subGraphLabel,setSubGraphLabel]=React.useState<string | null>(null);
    const [addNodeName,setAddNodeName]=React.useState<string | null>(null);
    const [addNodeColor,setAddNodeColor]=React.useState<string | null>(null);
    const [subGraphAssign,setSubGraphAssign]=React.useState<string |null>(null);
    // const [addEdge,setAddEdge]=React.useState<edgeType | null>(null);
    

    const handleAddSubGraph=(e:MouseEvent<HTMLButtonElement> | undefined)=>{
        e?.preventDefault();
        if(subGraphLabel){
            setSubGraphLabelArr([...subGraphLabelArr,subGraphLabel]);
        }
    }
    const handleAddNodeToArray=(e:MouseEvent<HTMLButtonElement> | undefined)=>{
        e?.preventDefault();
        if(addNodeName && addNodeColor && subGraphAssign){
            let newNode=new Node(addNodeName,{[_.color]:addNodeColor})
            setNodeArr([...nodeArr,{addNode:newNode,name:subGraphAssign,nodeName:addNodeName }]);
            setAddNodeName(null);
            setAddNodeColor(null);
            // let optionFoc:Element | null=document.querySelector("option#optionLayer");
            // optionFoc ? optionFoc.innerHTML="select another":null
        }
    }
    
    // console.log(addEdge,edgeArr)
  return (
    <div className="flex flex-col items-center justify-center w-full dark:bg-black dark:text-white py-2">
    <form className="flex flex-col items-center justify-center mx-0 my-2 w-full dark:bg-black dark:text-white py-1">
        <FormControl className="w-full mx-auto dark:bg-white dark:text-black">
        <InputLabel htmlFor="subGraphLabel" className="my-2 py-2">Layer for:{addNodeName && addNodeName}</InputLabel>
        <Input
        name={"subGraphLabel"}
        placeholder="layer name"
        value={subGraphLabel ? subGraphLabel :""}
        onChange={(e)=>setSubGraphLabel(e.target.value)}
        className="dark:bg-white dark:text-black"
        />
        <button className="button button my-1 cursor-pointer text-center"onClick={(e)=>handleAddSubGraph(e)}>add layer</button>

        </FormControl>
        <FormControl className="w-full mx-auto my-3 dark:bg-white dark:text-black">
        <InputLabel htmlFor="newNode">new node</InputLabel>
        <Input
        name={"newNode"}
        placeholder="add nodes"
        value={addNodeName ? addNodeName :""}
        onChange={(e)=>setAddNodeName(e.target.value)}
        className="dark:bg-white dark:text-black"
        />
        <FormHelperText className="dark:bg-white dark:text-black">minimum of two nodes,[node1,node2]</FormHelperText>
        </FormControl>
        {/* assign node to subgraph*/}
        <FormControl className="w-full mx-auto my-2">
        <InputLabel htmlFor="nodeAssign" shrink={true}>add node to layer</InputLabel>
        <select
        id="selectSubGraph"
        className="my-2 w-1/4 dark:bg-white dark:text-black"
        name={"nodeAssign"}
        defaultValue="select another"
        onChange={(e)=>setSubGraphAssign(e.target.value)}
        >
            <option disabled id="optionLayer">select a value</option>
            {subGraphLabelArr && subGraphLabelArr.map((subGraph,index)=>(
                <option value={subGraph} key={`${subGraph}-${index}`}>{subGraph}</option>
            ))
            }
            </select>
       
        </FormControl>
        {/*ADD NODE TO nodeArr */}
        <FormControl className="w-full mx-auto my-2 dark:bg-white dark:text-black">
        <InputLabel htmlFor="nodeColor">add node color</InputLabel>
        <Input
        name={"nodeColor"}
        placeholder="add node color"
        value={addNodeColor ? addNodeColor : ""}
        onChange={(e)=>setAddNodeColor(e.target.value)}
        className="dark:bg-white dark:text-black"
        />
        <button className="button button my-2 cursor-pointer text-center" onClick={(e)=>handleAddNodeToArray(e)}>add node to nodes</button>
        </FormControl>
    </form>
    {nodeArr.length>1 &&
        <AddEdges
        edgeArr={edgeArr}
        setEdgeArr={setEdgeArr}
        nodeArr={nodeArr}
        subGraphLabel={subGraphLabel}
        />
        }
       
    </div>
  )
}

export default FormGen