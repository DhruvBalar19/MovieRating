import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { fetchDatafFomapi } from "./utils/Api"
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfiguration, getGenres } from "./Store/Homeslice";

import Header from "./Componates/Header/Header"
import Footer from "./Componates/Footer/Footer"

import Home from "./Pages/Home/Home"
import Details from "./Pages/Details/Details"
import Searchresult from "./Pages/Searchresult/Searchresult"
import Explore from "./Pages/Explore/Explore"
import PageNoteFound from "./Pages/404/PageNoteFound"







function App() {

  const dispatch = useDispatch();
    const { url } = useSelector((state) => state.home);


  console.log(url);

  useEffect(() => {
    fatchApiConfig()
    genersCall()
  }, [])

  const fatchApiConfig = () => {
    fetchDatafFomapi('/configuration')
      .then((res) => {
        console.log(res);

        const url = {
          backdrop: res.images.secure_base_url + "original",
          poster: res.images.secure_base_url + "original",
          profile: res.images.secure_base_url + "original",
      };

      dispatch(getApiConfiguration(url));
  });
  
  }
  const genersCall = async () => {

    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((url) => {
        promises.push(fetchDatafFomapi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    console.log(data);
    data.map(({ genres }) => {
        return genres.map((item) => (allGenres[item.id] = item));
    });   

    dispatch(getGenres(allGenres));

  }



  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<Searchresult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNoteFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
