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
import Loading from './Loading';
import RMovieCard from './RecommendedMovieCard';

const RecommendedCarousel = ({ recoms }) => {
  const [movies, setMovies] = useState([]);
  const [max, setMax] = useState(0);
  const [tvSeries, setTvSeries] = useState();
  const [autoplayDone, setAutoplayDone] = useState(false);
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.update(); 
      swiperRef.current.swiper.navigation.update(); 

      swiperRef.current.swiper.on('autoplayStop', () => {
        setAutoplayDone(true);
      });
    }
    //console.log(recoms);
  }, [recoms]);

  const shouldLoop = movies.length > 5;

  return (
    <div id='carousel'>
      <div id='carouselHead'>
        <h1>AI Based Recommendations</h1>
      </div>
        {recoms.length<=0&&
            <div style={{display:'flex',justifyContent:'center',minHeight:'370px',flexFlow:'row wrap',alignContent:'center'}}>
                <Loading/>
            </div>
            
        }
      {recoms.length>0&&<Swiper
        style={{minHeight:'370px'}}
        ref={swiperRef}
        spaceBetween={10}
        navigation
        pagination={{ clickable: true }}
        modules={[Navigation]}
        autoplay={!autoplayDone ? { delay: 3000 } : false}
        loop={shouldLoop}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          1200: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
        }}
      >
        {recoms.map((movie, index) => (
          <SwiperSlide key={index}>
            <RMovieCard
              image={movie.backdrop}
              name={movie.name}
              rate={movie.rate}
              id={movie.id}
              type={movie.type}
            />
          </SwiperSlide>
        ))}
      </Swiper>}
    </div>
  );
};

export default RecommendedCarousel;
