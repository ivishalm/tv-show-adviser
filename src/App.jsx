import { useEffect, useState } from "react";
import s from "./style.module.css";
import { TVShowAPI } from "./api/tv-show";
import { BACKDROP_BASE_URL } from "./config";
import { TVShowDetail } from "./components/TVShowDetails";

function App() {
  const [currentTvShow, setCurrentTvShow] = useState([]);

  async function fetchPopularShows() {
    let data = await TVShowAPI.fetchPopularShows();
    console.log(data, "App");
    setCurrentTvShow(data[0]);
  }

  useEffect(() => {
    fetchPopularShows();
  }, []);

  return (
    <div
      className={s.main_container}
      style={{
        background: currentTvShow
          ? `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('${BACKDROP_BASE_URL}${currentTvShow.backdrop_path}') no-repeat center / cover`
          : "black",
      }}
    >
      <div className={s.header}>
        <div className="row">
          <div className="col-4">
            <div>logo</div>
            <div>subtitle</div>
          </div>
          <div className="col-md-12 col-lg-4">
            <input className="w-100" type="text" />
          </div>
        </div>
      </div>
      <div className={s.tv_show_detail}>
        {currentTvShow && <TVShowDetail tvShow={currentTvShow}></TVShowDetail>}
      </div>
      <div className={s.recommended_tv_shows}>Recommended Tv Show</div>
    </div>
  );
}

export default App;
