import React, { useEffect, } from "react";
import { Carousel, Col, message, Row } from "antd";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { GetAllMovies } from "../../apicalls/movies";
import { useNavigate} from "react-router-dom";
import moment from "moment";



function Home() {
  const [searchText = "", setSearchText] = React.useState("");
  const [movies, setMovies] = React.useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllMovies();
      if (response.success) {
        setMovies(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
  
    <div>
    <section>
    <div className="mb-2">
    <input
        type="text"
        className="search-input"
        placeholder="Search for movies"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)
        }
      ></input>
    
        </div>
    <Carousel autoplay>
     <img src={"img/sh.webp"}/>
     <img src={"img/pushpa.webp"}/>
     </Carousel>
   
    </section>
    <section>
    
      <Row gutter={[20]} className="mt-2">
        {movies
        .filter((movie) => movie.title.toLowerCase().includes(searchText.toLowerCase()))
        .map((movie) => (
          <Col span={4}>
            <div
              className="card flex flex-col gap-1 mb-2 cursor-pointer"
              onClick={() =>
                navigate(
                  `/movie/${movie._id}?date=${moment().format("YYYY-MM-DD")}`
                )
              }
            >
              <img src={movie.poster} alt="" height={200} />

              <div className="flex justify-center p-1">
                <h1 className="text-2xl text-black uppercase">{movie.title}</h1>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </section>
    <hr/>
    <footer id="footer">
  <div className="flex justify-center p-1">
  <h1 className="text-2xl text-white">
    <i class="ri-movie-2-fill"></i>CINEBOOKING
    </h1>
  </div>
  <div className="flex justify-center p-1">
    <p>© Copyright 2023 CINEBOOKING</p>
    </div>
    </footer>
  
    </div>
  );
}

export default Home;