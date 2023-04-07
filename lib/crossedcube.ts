import { INetwork } from "@/store/networks"
import Graph from "graphology"



export const buildCrossedcube = ()=>{
  
}


export const getCrossedNeighborLabel = (node: string, dimension: number)=>{

  const reverseIdx = (idx: number)=>{
    return node.length-idx-1
  }

  const getPair = (pair:string) =>{
    return ""
  }

  if(dimension<1 || dimension>node.length){
    return ''
  }
  //11100
  //11110
  //d = 2
  const diffIdx = node.length-dimension //1
  const diffBit: any = node[diffIdx]//1  
  const lamda = reverseIdx(diffIdx-1)//4
  let neighbor = node //11100

  if(lamda&1){
    //odd dimension
    neighbor = node.substring(0,diffIdx)+(diffBit ^ 1)+node.substring(diffIdx+1)

    for(let i = 0; i<Math.floor((lamda-1)/2); i++){
      const pair = neighbor.substring(neighbor.length-2*i)
      switch(pair){
        case '01':
          neighbor = neighbor.substring(0, reverseIdx(2*i+1))+ '11' + neighbor.substring(reverseIdx(2*i-1))
          break;
        case '11':
          neighbor = neighbor.substring(0, reverseIdx(2*i+1))+ '01' + neighbor.substring(reverseIdx(2*i-1))
          break;
      }
    }

  } else {
    //even dimension
    neighbor = node.substring(0,diffIdx)+(diffBit ^ 1)+node.substring(diffIdx+1)
    //11110
    for(let i = 0; i<Math.floor((lamda-1)/2); i++){
      const pair = neighbor.substring(reverseIdx(2*i+1), reverseIdx(2*i-1))
      //10
      switch(pair){
        case '01':
          neighbor = neighbor.substring(0, reverseIdx(2*i+1))+ '01' + neighbor.substring(reverseIdx(2*i-1))
          break;
        case '11':
          neighbor = neighbor.substring(0, reverseIdx(2*i+1))+ '01' + neighbor.substring(reverseIdx(2*i-1))
          break;
      }
    }


  }

  return neighbor
  
    
}

export const getNeighbor = (network:INetwork, node:string, dimension: number) => {
  const { graph } = network
  const nodeLabel = graph.getNodeAttribute(node, 'label')
  const neigLabel = getCrossedNeighborLabel(nodeLabel, dimension)
    
  return graph.findNeighbor(node, (neighbor, attributes)=>{
    return neigLabel === attributes.label
  })
}