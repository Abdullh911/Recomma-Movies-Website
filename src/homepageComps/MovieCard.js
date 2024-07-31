import React, { useEffect } from 'react';
import '../MovieCard.css';
import Default from '../assets/def.png'
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ image, name, additionalText,rate,type,id }) => {
    let navigate = useNavigate();
    function cardClicked(){
        navigate(`/${type}/${id}`);
    }
  return (
    <div onClick={cardClicked} className="movie-card">
      <div className="image-container">
        <div id='rate'>
            {rate}
        </div>
        <img src={image=="https://image.tmdb.org/t/p/originalnull"||image==""||image==null||image==undefined?Default:image} alt={name} />
        
      </div>
      <div className="movie-name">
        <p>{name}</p>
      </div>
    </div>
  );
};

export default MovieCard;
