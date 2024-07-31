import React from 'react';

const ActorCard = ({ name, profile, character }) => {
    return ( 
        <div className="actor-card">
            <img src={profile} alt={`${name} profile`} className="actor-image" />
            <div className="actor-info">
                <h5 className="actor-name">{name}</h5>
            </div>
        </div>
     );
}
 
export default ActorCard;
