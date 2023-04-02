import React, { HTMLProps, useState } from 'react'
import hypercube_data from '@/data/hypercube.json'
import { IEdge, graph, INetwork, INode, NetworkAttributes } from '@/lib/graph'

import styles from './NetworkDrawer.module.css'
import List from '@/components/List'
import ListItem from '@/components/ListItem'
import * as RadixLabel from '@radix-ui/react-label';
import * as Form from '@radix-ui/react-form'
import { Resolver, SubmitHandler, useForm } from 'react-hook-form'
import produce from 'immer'
import NodeForm from './NodeForm'
import NodeItem from './NodeItem'
import { useGraphStore } from '@/store/graph'
import NetworkForm from './NetworkForm'
import { renderNetwork } from '@/lib/sigma'



type NetworkFormValues = {
  key: string;
  type: string;
  label: string;
  nodeColor: string
  nodeSize: number
  edgeColor: string
  edgeSize: number
};

type NodeFormValues  ={
  key: string;
  label: string;

}

const networkResolver: Resolver<NetworkFormValues> = async (values) => {
  return {
    values: values,
    errors: {}
  };
};

const nodeResolver: Resolver<NodeFormValues> =async (values) => {
  return {
    values: values,
    errors: {}
  }
}

export default function Drawer() {



  const [nodeList, setNodeList] = useState<INode[]>([])
  const { register: networkReg, handleSubmit: handleNetworkSubmit } = useForm<NetworkFormValues>({ resolver: networkResolver });
  const { register: nodeReg, handleSubmit: handleNodeSubmit } = useForm<NodeFormValues>({ resolver: nodeResolver });
  const [addNetwork, addNodes] = useGraphStore((state)=>[state.addNetwork, state.addNodes])
  
  const onNetworkSubmit: SubmitHandler<NetworkFormValues> = (data) =>{
    console.log(data)
    console.log(nodeList)
    const { key , type, label, nodeColor, nodeSize, edgeColor, edgeSize } = data
    const attributes = {type, label, nodeColor, nodeSize, edgeColor, edgeSize}
    const network: INetwork = {key, attributes}
    // const nodeAttrs = {network:key, color:nodeColor, size:nodeSize}
    // const edgeAttrs = {network: key, color:edgeColor, size:edgeSize}

    // const nodes: INode[] = nodeList.map((node)=>({...node,attributes: nodeAttrs}))

    addNetwork(network)
    addNodes(nodeList)
    renderNetwork(network)

  };
  
  const onNodeSubmit: SubmitHandler<NodeFormValues> = (data) => {
    console.log(data)
    const { key, label } = data
    const node: INode = {
      key,
      attributes:{
        label
      }
    }

    setNodeList(
      produce((draft=>{
        draft.push(node)
      })) 
    )  
  }

  const deleteNode = (key: string) =>{
    setNodeList(nodeList.filter((node)=>{
      return node.key !== key
    }))
  }


  return (
    <div className={styles.wrapper}>
      <NetworkForm register={networkReg}/>
      <NodeForm register={nodeReg}/>
      <button onClick={handleNodeSubmit(onNodeSubmit)}>submit node</button>
      <List>
        {nodeList.map((node)=>
          <NodeItem key={node.key} node={node} deleteNode={deleteNode}/>
        )}
      </List>
      <button type="button" onClick={handleNetworkSubmit(onNetworkSubmit)}>submit network</button>
    
    </div>
  )
}



const Label = ({children, htmlFor}:{children?: React.ReactNode, htmlFor?: string})=>{
  return (
    <RadixLabel.Root 
      className="text-[15px] font-medium leading-[35px] text-white"
      htmlFor={htmlFor}
    >
      {children}
    </RadixLabel.Root>
  )
}

const Input = ({...prop}: HTMLProps<HTMLInputElement>)=>{
  return (
    <input 
      className="bg-blackA5 shadow-blackA9 inline-flex h-[35px] w-[200px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9"
      {...prop}
    />
  )
}




