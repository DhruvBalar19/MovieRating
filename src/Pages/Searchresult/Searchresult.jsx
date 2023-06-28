import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import "./style.scss";

import { fetchDatafFomapi } from "../../utils/Api";
import ContentWrapper from "../../Componates/ContantWrapper/ContantWrapper";
import MovieCard from "../../Componates/MovieCard/MovieCard";
import Spinner from "../../Componates/Spinner/Spinner";
// import noResults from "../../assets/no-results.png";

function Searchresult() {

  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const fetchInitialData = () => {
    setLoading(true);
    fetchDatafFomapi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        setData(res);
        setPageNum((prev) => prev + 1);
        setLoading(false);
      }
    );
  };

  const fetchNextPageData = () => {
    fetchDatafFomapi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        if (data.results) {
          setData({
            ...data, results: [...data?.results, ...res.results]
          })
        } else {
          setData(res)
        }
        setPageNum((prev) => prev + 1)
      }
    );
  }

  useEffect(() => {
    setPageNum(1)
    fetchInitialData()
  }, [query])

  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ?
            (
              <>
                <div className="pageTitle">
                  {`Serch${data?.total_results > 1 ? "results" : "results"}of'${query}'`}
                </div>
                <InfiniteScroll className="content" dataLength={data?.results?.length || []}
                  next={fetchNextPageData} hasMore={pageNum <= data?.total_pages} loader={<Spinner />} >

                  {data?.results?.map((item, index) => {
                    if (item?.media_type === "person") return;
                    return (
                      <MovieCard key={index} data={item} fromSearch={true} />
                    )
                  })}

                </InfiniteScroll>
              </>
            ) :
            (
              <span className="resultNotFound">
                Sorry,Result Not Found
              </span>
            )}
        </ContentWrapper>
      )
      }
    </div>
  )
}

export default Searchresult
