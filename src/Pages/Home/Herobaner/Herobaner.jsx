import React, { useEffect, useState } from 'react'
import "./Style.scss"
import { useNavigate } from 'react-router-dom'
import useFetch from '../../../Hooks/Usefatch'
import { useSelector } from 'react-redux'
import Img from "../../../Componates/LazyLodeImages/Img"
import ContentWrapper from "../../../Componates/ContantWrapper/ContantWrapper"

function Herobaner() {

  const [background, setBackground] = useState("")
  const [query, setQuery] = useState("")
  const navigate = useNavigate()


  const { url } = useSelector((state) => state.home)
  const { data, loading } = useFetch("/movie/upcoming")

  useEffect(() => {
    const bg = url?.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path

    setBackground(bg)
  }, [data])

  const searchQueryHandler = (event) => {

    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`)

    }
  }

  return (
    <div className='heroBaner'>

      {!loading && <div className='backdrop_img'>
        <Img src={background} />
      </div>}


      <div className='opacity-layer'></div>
      <ContentWrapper>

        <div className='heroBanerContent '>
          <span className='title'>Welcome</span>
          <span className='subtitle'> Millions of movies, TV shows and people to discover.
            Explore now.</span>
          <div className='searchinput'>
            <input type="text" name="" id="" placeholder='Search For a Movie or tv Show....' onChange={(e) => setQuery(e.target.value)} onKeyUp={searchQueryHandler} />
            <button>Search</button>
          </div>
        </div>

      </ContentWrapper>



    </div>
  )

}

export default Herobaner
