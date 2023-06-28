import React from 'react'
import { useState } from 'react'


import ContentWrapper from '../../../../Componates/ContantWrapper/ContantWrapper'
import Switchtabs from '../../../../Componates/SwitchTabs/Switchtabs'
import useFetch from "../../../../Hooks/Usefatch"
import Crousel from '../../../../Componates/Crousel/Crousel'



function Populer() {
    const [endpoint, setEndpoint] = useState("movie");

    const { data, loading } = useFetch(`/${endpoint}/popular`);

    const onTabChange = (tab) => {
        setEndpoint(tab == "movies" ? "movie" : "tv");
    };

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">What's Popular</span>
                <Switchtabs
                    data={["Movies", "TV Shows"]}
                    onTabChange={onTabChange}
                />
            </ContentWrapper>
            <Crousel
                data={data?.results}
                loading={loading}
                endpoint={endpoint}
            />
        </div>
    );
}

export default Populer
