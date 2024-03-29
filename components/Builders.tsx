import BCBuilder from '@/feature/Builder/BCBuilder'
import DimensionList from '@/feature/Builder/DimensionList'
import ISTList from '@/feature/Builder/ISTList'
import { useNetworkStore } from '@/store/networks'
import { useNodeStore } from '@/store/nodes'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React, { useState } from 'react'

export default function Builders() {

  const network = useNetworkStore((state)=>state.selected)
  const node = useNodeStore((state)=>state.selected)
  const [tabIndex, setTabIndex] = useState<number>(0)


  return (
    <Tabs 
      index={tabIndex}
      onChange={(index)=>setTabIndex(index)}
      isFitted 
      isLazy 
      size="sm" 
      minW="224px"
    >
      <TabList mb='1em'>
        <Tab isDisabled={!network}>BC</Tab>
        <Tab isDisabled={!network}>Dimension</Tab>
        <Tab isDisabled={!network || !node}>ISTs</Tab>
      </TabList>
      <TabPanels>
        <TabPanel p={0}>
          <BCBuilder/>
        </TabPanel>
        <TabPanel p={0}>
          <DimensionList/>
        </TabPanel>
        <TabPanel p={0}>
          <ISTList/>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
