import React from 'react'
import "./Style.scss"
import Herobaner  from"./Herobaner/Herobaner"
import Trendig from './Herobaner/Trendig/Trendig'
import Populer from './Herobaner/Populer/Populer'
import TopRated from './Herobaner/TopRated/TopRated'

function Home() {
  return (
    <div className='homepage'>
      <Herobaner/>
      <Trendig/>
      <Populer/>
      <TopRated/>
      

    </div>
  )
}

export default Home
