import ActorCard from "./ActorCard";
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
const ActorsCarousel = ({actors}) => {
    const shouldLoop = actors.length > 5;
    return ( 
        <div>
            <Swiper
                
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
                    slidesPerView: 6,
                    spaceBetween: 10,
                },
                1200: {
                    slidesPerView: 6,
                    spaceBetween: 10,
                },
                }}
            >
                {actors.map((actor, index) => (
                <SwiperSlide key={index}>
                    <ActorCard name={actor.name} profile={actor.profile} character={actor.character}/>
                </SwiperSlide>
                ))}
            </Swiper>
        </div>
     );
}
 
export default ActorsCarousel;