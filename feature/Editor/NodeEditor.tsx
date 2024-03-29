import {  NodeAttributes } from '@/lib/graph'
import { useNetworkStore } from '@/store/networks'
import { useNodeStore } from '@/store/nodes'
import { DeleteIcon } from '@chakra-ui/icons'
import { 

  FormControl, 
  FormErrorMessage, 
  FormLabel, 
  IconButton, 
  Input, 
  Select, 
  Stack, 
  useDisclosure} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import NodeDeleteAlert from './NodeDeleteAlert'

export default function NodeEditor() {
  
  const network = useNetworkStore((state)=>state.selected)
  const [node,updateNode,deleteNode] = useNodeStore((state)=>[state.selected,state.updateNode,state.deleteNode])
  const {register, watch, setValue } = useForm<Partial<NodeAttributes>>({
    mode:"onChange"
  })
  const {isOpen, onClose, onOpen} = useDisclosure()

  const label = watch("label")

  useEffect(()=>{
    if(!node) return
    setValue("label",node.attributes.label)
    return ()=>{
      setValue("label",undefined)
    }
  }, [node?.key])


  useEffect(()=>{
    if(!network || !node) return
    console.log("update label",node, label)
    updateNode(network.key, node.key, {label})
  }, [label])

  return (
    <>
      <form>
        <FormControl>
          <FormLabel display="flex" mr="0" alignItems="center" justifyContent="space-between">
              Label
              <IconButton
                aria-label=''
                icon={<DeleteIcon/>}
                size="xs"
                variant="outline"
                colorScheme="red"
                onClick={()=>network&&node&&onOpen()}
                isDisabled={!node}
              />
            </FormLabel>
          <Input {...register('label')}/>
        </FormControl>
      </form>
      <NodeDeleteAlert isOpen={isOpen} onClose={onClose}/>
    </>
  )
}
