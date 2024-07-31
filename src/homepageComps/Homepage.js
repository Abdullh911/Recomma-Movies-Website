import React, { useEffect, useState } from 'react';
import NavBar from "../bars/navBar";
import MyCarousel from "./MyCarousel";
import Loading from './Loading';
import Recommender from './Recommender';
import { useNavigate } from 'react-router-dom';
import {fetchMoviesByQuery} from '../recommaUtils/apiCalls'
import { fetchAIRecommendations } from '../recommaUtils/backendCalls';
import RecommendedCarousel from './RecommendedCarousel';


const Homepage = () => {
    const [showSeries, setShowSeries] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    let [isSeries,setIsSeries] =useState(false);
    let [chooser,setChooser]=useState(1);
    let [userData,setUserData]=useState(null);
    let [recoms,setRecoms]=useState([]);
    let navigate=useNavigate();
    
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSeries(true);
            setIsLoading(false);
        }, 1000); 

        return () => clearTimeout(timer); 
    }, []);
    useEffect(()=>{
        let temp = JSON.parse(localStorage.getItem('user'));
        setUserData(temp);
    },[])
    useEffect(()=>{
        async function showRecom(){
            //console.log("hi");
            if(userData!=null && (userData.watched.length!=0 || userData.favourites.length!=0)){
                //console.log(userData);
                let text="";
                //console.log("last");
                if(userData.watched.length){
                    for(let i=0; i<userData.watched.length; i++){
                        text+=userData.watched[i].name;
                        if(i!=userData.watched.length-1){
                            text+=" and "
                        }
                    }
                }
                if(userData.favourites.length!=0){
                    for(let i=0; i<userData.favourites.length; i++){
                        text+=userData.favourites[i].name;
                        if(i!=userData.favourites.length-1){
                            text+=" and "
                        }
                    }
                }
                
                let names=await fetchAIRecommendations(text);
                //console.log(names);
                let unsorted=[]
                for(let i=0;i<names.length;i++){
                    let z=await fetchMoviesByQuery(names[i]);
                    unsorted=[...unsorted,...z];
                }
                //console.log(unsorted)
                if(userData.watched.length!=0){
                    unsorted = unsorted.filter(movie => !userData.watched.some(chosenMovie => chosenMovie.id == movie.id));
                }
                if(userData.favourites.length!=0){
                    unsorted = unsorted.filter(movie => !userData.favourites.some(chosenMovie => chosenMovie.id == movie.id));
                }
                
                unsorted.sort((a, b) => {
                    if (a.popular === b.popular) {
                        return b.rate - a.rate;
                    }
                    return b.popular - a.popular;
                });
                let last=[];
                for(let i=0;i<unsorted.length;i++){
                    if(names.includes(unsorted[i].name) && !last.some(movie => movie.name == unsorted[i].name)){
                        last.push(unsorted[i])
                    }
                }
                //console.log(last);
                setRecoms(last);
                const serializedRecs = JSON.stringify(last);
                localStorage.setItem('recs', serializedRecs);
            }
        }
        let tempp = localStorage.getItem('recs');
        tempp = JSON.parse(tempp);
        if(tempp){
            setRecoms(tempp);
        }
        else{
            showRecom();
        }
        
        
    },[userData]);
    return ( 
        <div>
            
            <NavBar show={true}/>
            <div className="divider">
                <h1 onClick={()=>{
                    let temp=1
                    setChooser(temp);
                }} style={{backgroundColor:chooser==1?'#1ED760':'transparent',cursor:'pointer',borderRadius:'8px'}}>Movies</h1>
                <h1 onClick={()=>{
                    let temp=2
                    setChooser(temp);
                    }} style={{backgroundColor:chooser==2?'#1ED760':'transparent',cursor:'pointer',borderRadius:'8px'}}>Tv Shows</h1>
                    <h1  onClick={()=>{
                    let temp=3
                    setChooser(temp);
                    }} 
                    style={{backgroundColor:chooser==3?'#1ED760':'transparent',cursor:'pointer',borderRadius:'8px'}}
                    >Recommender Tool</h1>

            </div>
            {isLoading&&<div id='loading'>
                <Loading/>
            </div>}
            
            {!isLoading && (
                <>
                    {chooser==1 && <div>
                    
                        {(userData!=null && (userData.watched.length!=0 || userData.favourites.length!=0))&&<RecommendedCarousel recoms={recoms}/>}
                        
                        <MyCarousel isMovies={true} type={"now_playing"} name={"Now Playing"}/>
                        <MyCarousel isMovies={true} type={"top_rated"} name={"Top Rated"}/>
                        <MyCarousel isMovies={true} type={"upcoming"} name={"Upcoming"}/>
                    </div>}
                    {chooser==2 && <div>
                        {(userData!=null && (userData.watched.length!=0 || userData.favourites.length!=0))&&<RecommendedCarousel recoms={recoms}/>}
                        <MyCarousel isMovies={false} type={"airing_today"} name={"Airing Today"}/>
                        <MyCarousel isMovies={false} type={"on_the_air"} name={"On The Air"}/>
                        <MyCarousel isMovies={false} type={"popular"} name={"Popular"}/>
                        <MyCarousel isMovies={false} type={"top_rated"} name={"Top Rated"}/>
                    </div>}
                    {chooser==3&&<div>
                        <Recommender/>
                    </div>}
                </>
            )}
           
        </div>
     );
}
 
export default Homepage;
