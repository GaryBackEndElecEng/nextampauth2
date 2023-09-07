"use client";
import React from 'react';
import Image from 'next/image';
import { attribute as _,Node,Edge } from 'ts-graphviz';
import {Grid,Container} from "@mui/material";

type nodeType={
  name:string,
  addNode:Node,
  nodeName:string
}

type edgeType={
  name:string,
  edge:Edge,
  nodeArray:string[],
  label:string
  
}
type mainType={
  dot:string | null | undefined,
  edgeArr:edgeType[],
  nodeArr:nodeType[]
}
const GenGraph = ({dot,edgeArr,nodeArr}:mainType) => {
  if(dot){
    const flow= `https://quickchart.io/graphviz?graph=${dot}`;
  return (
    <Container maxWidth="lg" className="flex flex-col justify-center items-center w-full relative ">
    <img src={flow} alt="www.masterconnect.ca" 
    
    className="content-fit  w-full  shadow-xl rounded-lg"
    />
    <Grid container spacing={1} className="mx-auto container my-2">
      <Grid item xs={12} md={6} className="w-full h-[30vh] overflow-y-scroll border rounded-lg shadow-lg shadow-teal">
        <h3 className="text-xl text-center text-blue font-bold my-2">Nodes</h3>
        {nodeArr && nodeArr.length>0 && nodeArr.map((node,index)=>(
          <div className="m-auto w-full" key={index}>
            <h6 className="text-center text-md"><span className="font-bold">parent:</span>{node.name}</h6>
            <h6 className="text-center text-md"><span className="font-bold">Name:</span>{node.nodeName}</h6>
            <h6 className="text-center text-md"><span className="font-bold">color:</span>{node.addNode.attributes.get("color")}</h6>

          </div>
        ))}
      </Grid>
      <Grid item xs={12} md={6} className="w-full h-[30vh] overflow-y-scroll border rounded-lg shadow-lg shadow-teal">
      <h3 className="text-xl text-center text-blue font-bold my-2">Arrows</h3>
        {edgeArr && edgeArr.length>0 && edgeArr.map((edge,index)=>(
          <div className="m-auto w-full" key={index}>
            <h6 className="text-center text-md"><span className="font-bold">parent:</span>{edge.name}</h6>
            <h6 className="text-center text-md"><span className="font-bold">Name:</span>{edge.label}</h6>
            <h6 className="text-center text-md"><span className="font-bold">color:</span>{edge.edge.attributes.get("color")}</h6>
          </div>
        ))}
      </Grid>
    </Grid>
    </Container>
  )
  }
}

export default GenGraph