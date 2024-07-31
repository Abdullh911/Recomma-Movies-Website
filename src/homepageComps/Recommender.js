import { updateUser,fetchAIRecommendations } from "../recommaUtils/backendCalls";
import NavBar from "../bars/navBar";
import { fetchMoviesByQuery,getAllSortedRecommend,fetchMediaDetails } from "../recommaUtils/apiCalls";
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieCard from "./MovieCard";
import '../Recommender.css';
import Loading from "./Loading";

const Recommender = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [checkboxValue, setCheckboxValue] = useState(false);
    let [pic, setPic] = useState("");
    let [userData, setUserData] = useState(null);
    let [Cloading, setCloading] = useState(false);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);
    const searchRef = useRef(null);
    let [chosen, setChosen] = useState([]);
    let query = useRef();
    let [recommends, setRecommends] = useState([]);
    let [isLoading, setIsLoading] = useState(false);
    let pageRef=useRef();
    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        let temp = localStorage.getItem('user');
        temp = JSON.parse(temp);
        setUserData(temp);
    }, []);

    const handleSearchChange = async (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        if (query.trim() === '') {
            setSearchResults([]);
            return;
        }

        try {
            const results = await fetchMoviesByQuery(query);
            setSearchResults(results);
        } catch (error) {
            console.error('Error fetching movies:', error);
            setSearchResults([]);
        }
    };

    const handleCheckboxChange = (event) => {
        setCheckboxValue(event.target.checked);
        //console.log(event.target.checked);
    };
    async function getRecs(){
        scrollToBottom();
        setRecommends([]);
        if(chosen.length==0){
            return
        }
        if(!checkboxValue){
            setIsLoading(true);
            let x=await getAllSortedRecommend(chosen);
            setRecommends(x);
            setIsLoading(false);
        }
        else{
            setIsLoading(true);
            let text="";
            //console.log("last");
            for(let i=0; i<chosen.length; i++){
                text+=chosen[i].name;
                if(i!=chosen.length-1){
                    text+=" and "
                }
            }
            let names=await fetchAIRecommendations(text);
            //console.log(names);
            let unsorted=[]
            for(let i=0;i<names.length;i++){
                let z=await fetchMoviesByQuery(names[i]);
                unsorted=[...unsorted,...z];
            }
            unsorted = unsorted.filter(movie => !chosen.some(chosenMovie => chosenMovie.id == movie.id));
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
            
            setRecommends(last);
            setIsLoading(false);
            //console.log(last);
        }
    }

    async function addToWatchedRemove(index) {
        let temp = localStorage.getItem('user');
        temp = JSON.parse(temp);
        let id = chosen[index].id;
        let type = chosen[index].type;
        let movieObj = {
            type: chosen[index].type,
            id: chosen[index].id
        };
        //console.log(chosen[index]);
        
        if (temp != null) {
            const existsInWatched = temp.watched.some(movie => movie.id == chosen[index].id);
            //console.log(existsInWatched);
            if (!existsInWatched) {
                temp.watched.push(movieObj);
            }
            let newOne = await updateUser(temp.email, temp);
            if (newOne != null) {
                const serializedUser = JSON.stringify(newOne);
                localStorage.setItem('user', serializedUser);
            }
        }
    }
    const scrollToBottom = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'  
        });
    };
    const getCollectionData=async (Ctype)=>{
        setCloading(true)
        let temp = localStorage.getItem('user');
        temp = JSON.parse(temp);
        if(temp==null){
            navigate('/login')
            return
        }
        let tempCollection;
        if(Ctype=="watched"){
            tempCollection=temp.watched;
        }
        else{
            tempCollection=temp.favourites;
        }
        let x=[];
        for(let i=0;i<tempCollection.length;i++){
            let y=await fetchMediaDetails(tempCollection[i].type,tempCollection[i].id);
            x.push(y);
        }
        let updateChosen=[...chosen, ...x];
        setChosen(updateChosen);
        setCloading(false)
    }
    

    return (
        <div >
            <div className="search-container">
                <div className="searchTogglee">
                    <div id="Searchbar">
                            <input
                                placeholder="Search"
                                type="search"
                                className="searchh"
                                id="search"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                ref={query}
                            />
                            {searchResults.length > 0 && (
                            <div ref={searchRef} className="search-resultss">
                                {searchResults.map((movie) => (
                                    <div onClick={() => {
                                        if(!chosen.some(item => item.id == movie.id)){
                                            const updatedChosen = [...chosen, movie];
                                            setChosen(updatedChosen);
                                        }
                                        setSearchResults([]);
                                        setSearchQuery("");
                                        //console.log(checkboxValue);
                                    }} key={movie.id} className="search-result-item">
                                        <img src={movie.poster} alt={movie.name} />
                                        <span>{movie.name}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    <div style={{display:'flex',marginLeft:'4%',marginTop:'2%'}}>
                        <span style={{marginLeft:'5%',marginRight:'2%',color:'black'}}>Database</span>
                        <label  className="switch">
                            <input
                            style={{marginLeft:'5%'}}
                                type="checkbox"
                                checked={checkboxValue}
                                onChange={handleCheckboxChange}
                            />
                        </label>
                        <span style={{color:'black'}} >AI</span>
                        <button onClick={getRecs} style={{marginLeft:'8%',borderRadius:'8px',backgroundColor:'white'}}>Recommend</button>
                    </div>
                    <div style={{marginLeft:'8%'}}>
                        <button onClick={()=>{
                            getCollectionData("watched");
                        }} style={{borderRadius:'8px',backgroundColor:'white'}}>Add Watched Movies</button>
                        
                        <button onClick={()=>{
                            getCollectionData("favourites");
                        }} style={{borderRadius:'8px',backgroundColor:'white'}}>Add Favourite Movies</button>
                        {Cloading&&<div id="sp" style={{marginLeft:'5%'}} class="dot-spinner">
                                <div class="dot-spinner__dot"></div>
                                <div class="dot-spinner__dot"></div>
                                <div class="dot-spinner__dot"></div>
                                <div class="dot-spinner__dot"></div>
                                <div class="dot-spinner__dot"></div>
                                <div class="dot-spinner__dot"></div>
                                <div class="dot-spinner__dot"></div>
                                <div class="dot-spinner__dot"></div>
                            </div>}
                    </div>
                    
                </div>
                
            </div>
            <div className="movieCont">
                {chosen.map((movie, index) => (
                    <div key={index}>
                        <MovieCard
                            image={movie.poster}
                            name={movie.name}
                            rate={movie.rate}
                            id={movie.id}
                            type={movie.type}
                        />
                        <div>
                            <button onClick={() => {
                                const updatedChosen = [...chosen];
                                updatedChosen.splice(index, 1);
                                setChosen(updatedChosen);
                            }} className='watchButtons'><i className="fa-solid fa-x fa-xl" style={{ color: "#1ed760" }}></i></button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="RmovieCont" ref={pageRef}>
                {isLoading && <Loading/>}
            {recommends.length>0&&recommends.map((movie, index) => (
                    <div key={index}>
                        <MovieCard
                            image={movie.poster}
                            name={movie.name}
                            rate={movie.rate}
                            id={movie.id}
                            type={movie.type}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Recommender;