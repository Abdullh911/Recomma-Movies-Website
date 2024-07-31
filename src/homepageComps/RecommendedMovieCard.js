import { useNavigate } from 'react-router-dom';
import '../RMovieCard.css'
const RMovieCard = ({ image, name, additionalText,rate,type,id }) => {
    let navigate = useNavigate();
    function cardClicked(){
        navigate(`/${type}/${id}`);
    }
    return ( 
        <div onClick={cardClicked} className="RCard">
            <div className="backgroundOverlay" style={{ 
                position: 'absolute',
                height: '97%', 
                width: '70%', 
                backgroundImage: `url(${image})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center',
                opacity: 0.5,
                borderRadius:'15px',
                zIndex: 0
            }} />
            <h1>{name}</h1>
            <h3>{rate}</h3>
        </div>
     );
}
 
export default RMovieCard;