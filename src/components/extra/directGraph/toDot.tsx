"use client";
import { attribute as _, Digraph, toDot,Subgraph,Node,Edge } from 'ts-graphviz';
type nodeType={
  name:string,
  addNode:Node 
}
type attributeType={
  [_.label]:string,
  [_.color]:string,
}
type edgeType={
  name:string,
  edge:Edge,
  nodeArray:string[],
  
}

const toDotFunc2 = (
  nodeArr:nodeType[]|[],
    edgeArr:edgeType[] | [],
    subGraphLabelArr:string[]|[]
) => {
  if(nodeArr.length>0 && edgeArr.length>0 && subGraphLabelArr.length>0){
  const G = new Digraph();
  let arr:any[]=[]
  subGraphLabelArr.forEach((name,index)=>{
    if(index>0){
      const A=new Subgraph(name);
    G.addSubgraph(A);
    let nodes=nodeArr.filter(node=>(node.name===name));
    let edges=edgeArr.filter(edge=>(edge.name===name));
    nodes.forEach((node,index)=>{
      A.addNode(node.addNode);
      // console.log("node.addNode",node.addNode)
    });
    edges.forEach((edge,index)=>{
      if(edge.nodeArray.length>0 && edge.edge){
      A.addEdge(edge.edge)
      }
    });
  }
    
  });
  const dotThis=toDot(G)
  const DotOut= dotThis ? dotThis:null;
  return DotOut
}
}

export default toDotFunc2