import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchMediaDetails } from "../recommaUtils/apiCalls";
import NavBar from "../bars/navBar";
import MovieCard from "./MovieCard";
import Loading from "./Loading";
import '../UserCollections.css'
const UserCollections = () => {
    let navigate=useNavigate();
    let {collectionType}=useParams();
    let [collection,setCollection]=useState([]);
    let [isloading,setIsLoading]=useState(true);
    useEffect(()=>{
        setIsLoading(true);
        let temp = localStorage.getItem('user');
        temp = JSON.parse(temp);
        if(temp==null){
            navigate('/login');
            return
        }
        //console.log(temp);
        //console.log(collectionType);
        let tempCollection;
        if(collectionType=="watchlist"){
            tempCollection=temp.watchlist;
        }
        else if(collectionType=="watched"){
            tempCollection=temp.watched;
        }
        else{
            tempCollection=temp.favourites;
        }
        const getCollectionData=async ()=>{
            let x=[];
            for(let i=0;i<tempCollection.length;i++){
                let y=await fetchMediaDetails(tempCollection[i].type,tempCollection[i].id);
                x.push(y);
            }
            setCollection(x);
        }
        getCollectionData();
        setIsLoading(false);
    },[collectionType])
    return ( 
        <div id="allCollection">
            <NavBar show={true}/>
            <h1 style={{color:'white',marginLeft:'2%'}}>{collectionType}</h1>
            {isloading&&<div style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignContent:'center'}}>
                <Loading />
            </div>}
            {!isloading&&<div id="collection">
                
                {collection.map((movie, index) => (
                        <MovieCard
                            key={index}
                            image={movie.poster}
                            name={movie.name }
                            rate={movie.rate}
                            id={movie.id}
                            type={movie.type}
                        />
                ))}
            </div>}
        </div>
     );
}
 
export default UserCollections;