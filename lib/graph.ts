import hyper_data from '@/data/hyper_data.json'
import raw_data from '@/data/raw_data.json'

import Graph from 'graphology';

export interface NodeAttributes {
  x?: number;
  y?: number;
  label?: string;
  color?: string;
  size?: number;
  hidden?: boolean;
  highlighted?: boolean
}

export interface EdgeAttributes  {
  label?: string;
  color?: string;
  size?: number;
  hidden?: boolean;
  highlighted?: boolean
} 
export interface GraphAttributes {
  name: string;
  type?: string;
  dimension?: number
}



export interface Node {
  key: string
  attributes?: NodeAttributes
}

export interface Edge {
  key: string
  source: string
  target: string
  attributes?: EdgeAttributes
}


// export const updateNetworkAttributes = (networkKey: string, attributes: NetworkAttributes) =>{
//   graph.updateAttribute('networks', oldVal=>{
//     if(!oldVal) { console.log('network does not exist', networkKey);return [] }

//     const networks = oldVal
//     networks.forEach((network)=>{
//       if(network.key !== networkKey) { return }

//       network.attributes = attributes
//     })

//     return networks
//   })
// }

// export const getNetworkAttributes = (networkKey:string)=>{
//   return graph.getAttribute('networks').find((network)=>{
//     return network.key === networkKey
//   })

// }



export const hypercube = new Graph()
export const raw = new Graph()
hypercube.import(hyper_data)
raw.import(raw_data)