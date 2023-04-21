import AttriubteList from '@/feature/Attribute/AttriubteList'
import Builder from '@/feature/Builder/Builder'
import DimensionList from '@/feature/Dimension/DimensionList'
import ISTbuilder from '@/feature/IST/ISTbuilder'
import { Card, CardBody, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React from 'react'



export enum ToolType {
  DIMENSION,
  BC,
  IST 
}

export const tools = [
  {type: ToolType.DIMENSION, text:'Dimension', comp:<DimensionList/>},
  {type: ToolType.BC, text:'BC', comp: <Builder/>},
  {type: ToolType.IST, text:'IST', comp: <ISTbuilder/>}
]

interface IProp {
  tool?: ToolType

}

export default function ToolPanel() {
  return (
    <Card>
      <CardBody>
        <AttriubteList/>
      </CardBody>
      <Tabs isFitted variant='line' size='sm' isLazy>
        <TabList >
          {tools.map((tool)=>(
            <Tab key={tool.type}>{tool.text}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {tools.map((tool)=>(
            <TabPanel key={tool.type}>
              {tool.comp}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Card>
  )
}
