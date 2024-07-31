import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';

const RecommendCarousel = ({ movies, name }) => {
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
  }, [movies]);

  const shouldLoop = movies.length > 5;

  return (
    <div id='carousel'>
      <div id='carouselHead'>
        <h1>{name}</h1>
        <Link to={`viewAll/${name}`}><h2>See All</h2></Link>
      </div>

      <Swiper
        ref={swiperRef}
        spaceBetween={10}
        navigation
        pagination={{ clickable: true }}
        modules={[Navigation]}
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
              type={movie.type}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RecommendCarousel;
