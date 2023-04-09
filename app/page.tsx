"use client"


import Header, { normalHeight } from '@/components/Header/Header'
import Network from '@/components/Network'

import Sidebar from '@/components/Sidebar/Sidebar'
import Toolbar from '@/components/Toolbar/Toolbar'
import Dimension from '@/feature/Dimension/Dimension'
import Editor from '@/feature/Editor/Editor'

import Stage from '@/refactor/Stage'
import { Box } from '@chakra-ui/react'


export default function Home() {



  return (
    <>
      <Header/>
      <Box as="main" position='relative' flex='1 1 auto'>
        <Toolbar/>
      </Box>
      <Sidebar/>
    </>

  )
}
