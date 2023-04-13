import DimensionList from '@/feature/Dimension/DimensionList'
import NetworkBuilder from '@/feature/NetworkBuilder'
import { ToolType, useToolStore } from '@/store/tools'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { 
  Menu, 
  MenuButton, 
  MenuList,
  Button, 
  Box, 
  MenuItemOption, 
  MenuOptionGroup } from '@chakra-ui/react'
import React from 'react'


export default function ToolMenu() {

  const [tools,selected, setSelected] = useToolStore((state)=>[state.tools, state.selected,state.setSelected])

  const handleTool = (nextTool:string)=>{
    console.log('select tool')
    setSelected(nextTool === selected? null: nextTool)
  }

  return (
    <Box           
      position='fixed' 
      top='16px' 
      right='16px' 
      zIndex='popover'
    >
      <Menu matchWidth isLazy >
        <MenuButton 
          as={Button} 
          minWidth='240px' 
          variant='outline' 
          leftIcon={<ChevronDownIcon/>}       
        >
          {selected? selected: "Select Tool"}
        </MenuButton>
        <MenuList zIndex='popover'>
          <MenuOptionGroup  type="radio" value={selected? selected: undefined}  >
            {tools.map((tool)=>(
              <MenuItemOption 
                as={Button} 
                key={tool}
                value={tool} 
                onClick={()=>handleTool(tool)}
              > 
                {tool} 
              </MenuItemOption>
            ))}
          </MenuOptionGroup>
        </MenuList>
      </Menu>
      <Box position='absolute' top='56px' zIndex='overlay' borderWidth='1px' borderRadius='md' hidden={!selected || selected === ToolType.IST}>
        <DimensionList/>
        <NetworkBuilder/>
      </Box>
    </Box>
  )
}
