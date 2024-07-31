import React, { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { getCarousel, getMoviePageNumbers, getSeriesCarousel, getSeriesPageNumbers } from '../recommaUtils/apiCalls';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';

const MyCarousel = ({ type, name, isMovies }) => {
  const [movies, setMovies] = useState([]);
  const [max, setMax] = useState(0);
  const [tvSeries, setTvSeries] = useState();
  const [autoplayDone, setAutoplayDone] = useState(false);
  const swiperRef = useRef(null);

  useEffect(() => {
    if (isMovies) {
      setTvSeries("movie");
    } else {
      setTvSeries("tv");
    }

    const fetchMovies = async () => {
      try {
        let tempMovies = await getCarousel(type);
        setMovies(tempMovies);
        //console.log(tempMovies);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    const getMoviesMax = async () => {
      try {
        let tempMax = await getMoviePageNumbers(type);
        setMax(tempMax);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    const getSeriesMax = async () => {
      try {
        let tempMax = await getSeriesPageNumbers(type);
        setMax(tempMax);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    const fetchSeries = async () => {
      try {
        let tempMovies = await getSeriesCarousel(type);
        setMovies(tempMovies);
        //console.log(tempMovies);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    if (isMovies) {
      getMoviesMax();
      fetchMovies();
    } else {
      fetchSeries();
      getSeriesMax();
    }
  }, [type, isMovies]);

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.update(); 
      swiperRef.current.swiper.navigation.update(); 

      swiperRef.current.swiper.on('autoplayStop', () => {
        setAutoplayDone(true);
      });
    }
  }, [movies]);

  const shouldLoop = movies.length > 5;

  return (
    <div id='carousel'>
      <div id='carouselHead'>
        <h1>{name}</h1>
        <Link to={`viewAll/${tvSeries}/${type}/${1}/${max}`}><h2>See All</h2></Link>
      </div>

      <Swiper
        ref={swiperRef}
        spaceBetween={10}
        navigation
        pagination={{ clickable: true }}
        modules={[Navigation]}
        autoplay={!autoplayDone ? { delay: 3000 } : false}
        loop={shouldLoop}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
          1200: {
            slidesPerView: 6,
            spaceBetween: 10,
          },
        }}
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={index}>
            <MovieCard
              image={movie.poster}
              name={movie.name}
              rate={movie.rate}
              id={movie.id}
              type={tvSeries}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MyCarousel;
