import { useEffect, useState } from "react";
import s from "./style.module.css";
import { TVShowAPI } from "./api/tv-show";
import { BACKDROP_BASE_URL } from "./config";
import { Logo } from "./components/Logo/Logo";
import { TVShowDetail } from "./components/TVShowDetails/TVShowDetails";
import logoImg from "./assets/images/logo.png";
import { TVShowList } from "./components/TVShowList/TVShowList";
import { SearchBar } from "./components/SearchBar/SearchBar";

function App() {
  const [currentTvShow, setCurrentTvShow] = useState();
  const [recommendationList, setRecommendationList] = useState([]);

  async function fetchPopularShows() {
    try {
      let data = await TVShowAPI.fetchPopularShows();
      if (data.length) {
        setCurrentTvShow(data[0]);
      }
    } catch (error) {
      alert("Something went wrong!!!");
    }
  }

  async function fetchRecommendationTvShows(tvShowId) {
    try {
      const recommendationListResp = await TVShowAPI.fetchRecommendations(tvShowId);
      if (recommendationListResp.length) {
        setRecommendationList(recommendationListResp.slice(0, 10));
      }
    } catch (error) {}
  }

  async function fetchByTitle(title) {
    try {
      const searchResp = await TVShowAPI.searchTvShows(title);
      if (searchResp.length) {
        setCurrentTvShow(searchResp[0]);
      }
    } catch (error) {}
  }

  useEffect(() => {
    fetchPopularShows();
  }, []);

  useEffect(() => {
    if (currentTvShow) {
      fetchRecommendationTvShows(currentTvShow.id);
    }
  }, [currentTvShow]);

  function updateCurrentTvShow(tvShow) {
    setCurrentTvShow(tvShow);
  }

  return (
    <div
      className={s.main_container}
      style={{
        background: currentTvShow
          ? `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('${BACKDROP_BASE_URL}/${currentTvShow.backdrop_path}') no-repeat center / cover`
          : "black",
      }}
    >
      <div className={s.header}>
        <div className="row">
          <div className="col-4">
            <Logo logo={logoImg} title="Watowatch" subtitle="Find a show you may like" />
          </div>
          <div className="col-md-12 col-lg-4">
            <SearchBar onSubmit={fetchByTitle} />
          </div>
        </div>
      </div>
      <div className={s.tv_show_detail}>
        {currentTvShow && <TVShowDetail tvShow={currentTvShow}></TVShowDetail>}
      </div>
      <div className={s.recommended_tv_shows}>
        {recommendationList.length && (
          <TVShowList onClickItem={updateCurrentTvShow} tvShowList={recommendationList} />
        )}
      </div>
    </div>
  );
}

export default App;
