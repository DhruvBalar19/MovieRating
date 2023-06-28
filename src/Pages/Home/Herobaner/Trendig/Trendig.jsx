import { useState } from 'react'
import React from 'react'


import ContentWrapper from '../../../../Componates/ContantWrapper/ContantWrapper'
import Switchtabs from '../../../../Componates/SwitchTabs/Switchtabs'
import useFetch from "../../../../Hooks/Usefatch"
import Crousel from '../../../../Componates/Crousel/Crousel'



function Trendig() {
  const [endpoint, setEndpoint] = useState("day")
  const { data, loading } = useFetch(`/trending/all/${endpoint}`)

  const onTabChange = (tab) => {

    setEndpoint(tab==="Day"? "day":"week")
  }


  return (
    <div className='carouselSection'>
      <ContentWrapper>
        <span className='carouselTitle'>Trending</span>
        <Switchtabs data={["Day", "Week"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Crousel data={data?.results} loading={loading}/>
    </div>
  )
}

export default Trendig
