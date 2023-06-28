import React from 'react'
import "./Style.scss"
import { useParams } from 'react-router-dom'
import useFetch from "../../Hooks/Usefatch"
import DetailsBanner from './DetailsBaner/Detailsbaner'
import Cast from './Cast/Cast'
import VideosSection from './VedioSection/Videosection'
import Similar from './Carousel/Similer'
import Recommendation from './Carousel/Recomandesion'

function Details() {


  const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
    const { data: credits, loading: creditsLoading } = useFetch(
        `/${mediaType}/${id}/credits`
    );

  return (

    <div>
      <DetailsBanner video={data?.results?.[0]}  crew={credits?.crew}/>
      <Cast data={credits?.cast} loading={creditsLoading}/>
      <VideosSection data={data} loading={loading}/>
      
      <Similar mediaType={mediaType} id={id}/>
      <Recommendation mediaType={mediaType} id={id}/>
    </div>
  )
}

export default Details
