import { useState } from 'react'
import React from 'react'


import ContentWrapper from '../../../../Componates/ContantWrapper/ContantWrapper'
import Switchtabs from '../../../../Componates/SwitchTabs/Switchtabs'
import useFetch from "../../../../Hooks/Usefatch"
import Crousel from '../../../../Componates/Crousel/Crousel'



function TopRated() {
  
    // const [endpoint, setEndpoint] = useState("movie")
    // const { data, loading } = useFetch(`/${endpoint}/top_rated`)


    const [endpoint, setEndpoint] = useState("movie")
    const { data, loading } = useFetch(`/${endpoint}/top_rated`)

    const onTabChange = (tab) => {

        setEndpoint(tab === "Movies" ? "movie" : "tv")
    }


    return (
        <div className='carouselSection'>
            <ContentWrapper>
                <span className='carouselTitle'>Top Rated </span>
                <Switchtabs data={["Movies", "Tv Shows"]} onTabChange={onTabChange} />
            </ContentWrapper>
            <Crousel data={data?.results} loading={loading} endpoint={endpoint}/>
        </div>
    )
}

export default TopRated
