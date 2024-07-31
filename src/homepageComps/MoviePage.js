import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from "../bars/navBar";
import { fetchMediaDetails, fetchCharaters, getSimilar, getNumberOfEpisodes,getTrailer,getDownload,fetchMoviesByQuery } from "../recommaUtils/apiCalls";
import { getComments } from '../recommaUtils/backendCalls';
import ActorsCarousel from "./ActorsCarousel";
import '../MoviePage.css';
import MyCarousel from "./MyCarousel";
import Similarcarousel from "./SimilarCarousel";
import AddCommentInput from "./AddCommentInput";
import Comment from './Comment';
import Loading from './Loading';
import { updateUser,fetchAiChatResponse,fetchAIRecommendations } from '../recommaUtils/backendCalls';
import VideoPlayer from './VideoPlayer'; 
import Modal from './Modal'; 
import Default from '../assets/def.png';
const MoviePage = () => {
    const { id, type } = useParams();
    const [data, setData] = useState(null);
    const [genres, setGenres] = useState("");
    const [actors, setActors] = useState([]);
    const [similar, setSimilar] = useState([]);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [watched, setWatched] = useState(false);
    const [watchlisted, setWatchlisted] = useState(false);
    const [favourited, setFavourited] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisibleT, setIsModalVisibleT] = useState(false);
    const navigate = useNavigate();
    const [imdb, setImdb] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const selectSeasonRef = useRef("1");
    const selectEpisodeRef = useRef("1");
    const [episodes, setEpisodes] = useState([]);
    const [seasons, setSeasons] = useState([]);
    const [currentEpisodes, setCurrentEpisodes] = useState(0);
    const [trailerUrl, setTrailerUrl] = useState("");
    const [isChatVisible, setIsChatVisible] = useState(false);
    const inputRef = useRef();
    const [isDisabled, setIsDisabled] = useState(false);
    const [responses, setResponses] = useState([]); 
    const [downloads, setDownloads] = useState([]); 
    let [pic, setPic] = useState("");
    const messagesEndRef = useRef(null);
    const [downloadLoading,setDownloadLoading]=useState(false);
    async function download(){
        setDownloadLoading(true)
        let tempD;
        if(data.type=="tv"){
            let s=selectSeasonRef.current.value;
            let e=selectEpisodeRef.current.value;
            tempD=await getDownload(data.name+` s0${s}e0${e}`);
        }
        else{
            tempD=await getDownload(data.name);
        }
        setDownloads(tempD);
        setDownloadLoading(false);
    }
    async function send(){
        let c=inputRef.current.value;
        if(c==""){
            return
        }
        setIsDisabled(true);
        
        //console.log(c);
        let temp=responses;
        temp.push(c);
        setResponses(temp);
        inputRef.current.value = "";
        let init= await fetchAiChatResponse(c,data.name);
        //console.log(init);
        temp=responses;
        temp.push(init)
        setResponses(temp);
        setIsDisabled(false);
        //console.log(responses);
    }   
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          send();
        }
      };
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
        }
    }, [responses,isDisabled]);
    const toggleChat = () => {
        setIsChatVisible(!isChatVisible);
    };
    const openModal = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };
    const closeModalT = () => {
        setIsModalVisibleT(false);
    };
    useEffect(() => {
        
        setDownloads([]);
        setResponses([]);
        setIsChatVisible(false);
        setLoading(true)
        const fetchData = async () => {
            try {
                const tempData = await fetchMediaDetails(type, id);
                setData(tempData);
                if (tempData.genres) {
                    const genreNames = tempData.genres.map(genre => genre.name).join(' & ');
                    setGenres(genreNames);
                }
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        const fetchActors = async () => {
            try {
                const tempActors = await fetchCharaters(type, id);
                setActors(tempActors);
            } catch (error) {
                console.error('Error fetching actors:', error);
            }
        };
      

        const fetchCommentsData = async () => {
            try {
                const commentsData = await getComments(id);
                setComments(commentsData);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        const loadUserPreferences = () => {
            const temp = JSON.parse(localStorage.getItem('user'));
            if (temp) {
                setWatched(temp.watched.some(item => item.id === id));
                setWatchlisted(temp.watchlist.some(item => item.id === id));
                setFavourited(temp.favourites.some(item => item.id === id));
            }
        };
        
        loadUserPreferences();
        fetchData();
        fetchActors();
        
        
        fetchCommentsData();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [id, type]);






    useEffect(() => {
        if (data) {
            async function showRecom() {
                if (data) {
                    let text = data.name;
                    let names = await fetchAIRecommendations(text);
                    let unsorted = [];
                    for (let i = 0; i < names.length; i++) {
                        let z = await fetchMoviesByQuery(names[i]);
                        unsorted = [...unsorted, ...z];
                    }
                    unsorted.sort((a, b) => {
                        if (a.popular === b.popular) {
                            return b.rate - a.rate;
                        }
                        return b.popular - a.popular;
                    });
                    let last = [];
                    for (let i = 0;i<unsorted.length && i <= 50; i++) {
                        last.push(unsorted[i]);
                    }
                    for(let i=0;i<last.length;i++){
                        if(last[i].name=data.name){
                            last.splice(i,1);
                            continue;
                        }
                        for(let j=i+1;j<last.length;j++){
                            if(last[i].name==last[j].name){
                                last.splice(j,1);
                            }
                        }
                    }
                    setSimilar(last);
                    setLoading(false);
                }
            }
            
            const loadTrailer = async() => {
                let x=await getTrailer(data.id,data.type);
                //console.log(x);
                setTrailerUrl(x);
            };
            
            showRecom();
            loadTrailer();
            
        }
        //console.log(data);
    }, [data]);
    useEffect(()=>{
        //console.log(similar);
    },[similar])

    const handleCommentAdded = async () => {
        try {
            const commentsData = await getComments(id);
            setComments(commentsData);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };
   
    const handleUserAction = async (action) => {
        let temp = JSON.parse(localStorage.getItem('user'));
        if (!temp) {
            navigate('/login');
            return;
        }
        let name=data.name;
        const movieObj = { type, id ,name};
        const actionKey = action === 'watched' ? 'watched' : action === 'watchlist' ? 'watchlist' : 'favourites';
        const exists = temp[actionKey].some(movie => movie.id === id);

        if (!exists) {
            temp[actionKey].push(movieObj);
        } else {
            temp[actionKey] = temp[actionKey].filter(movie => movie.id !== id);
        }
        //console.log(temp);
        const updatedUser = await updateUser(temp.email, temp);
        if (updatedUser) {
            localStorage.setItem('user', JSON.stringify(updatedUser));
            if (action === 'watched') setWatched(!exists);
            if (action === 'watchlist') setWatchlisted(!exists);
            if (action === 'favourites') setFavourited(!exists);
        }
    };
    let ai="AR"
    useEffect(() => {
        let temp = localStorage.getItem('user');
        temp = JSON.parse(temp);
        if (temp != null || temp != undefined) {
            let firstTwoLetters = temp.username.substring(0, 2);
            setPic(firstTwoLetters);
        }
    }, [])
    function redirect (link){
        window.open(link, '_blank');
    }
    

    if (!data) return <div style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignContent:'center'}}>
        <Loading />
    </div>;

    return (
        <div id="allMoviePage"style={{ position:'relative'  }}>
            <div className="backgroundOverlay" style={{ 
                        position: 'absolute',
                        height: '100%', 
                        width: '100%', 
                        backgroundImage: `url(${data.backdrop})`, 
                        backgroundSize: 'cover', 
                        backgroundPosition: 'center',
                        opacity: 0.5,
                        zIndex: 0
                    }} />
            <NavBar show={true} />
            
            <div id="moviePageContainer">
                <div id="moviPageFirst" style={{ position:'relative'  }}>
                        
                    <div id="movieData">
                        <div id="imgAdds">
                            <img id="poster" src={data.poster==""||data.poster==null||data.poster=="https://image.tmdb.org/t/p/originalnull"?Default:data.poster} alt={data.name} />
                            <div>
                                <h1>{data.name}</h1>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <i className="fa-solid fa-star fa-lg" style={{ color: "#1ed760", marginRight: '8px' }}></i>
                                    <h2 style={{ margin: 0, color: 'rgb(182, 176, 176)' }}>{data.rate}</h2>
                                </div>
                                <div style={{ display: 'block' }}>
                                    <button onClick={() => handleUserAction('watched')} style={{ backgroundColor: watched ? 'green' : 'transparent' }} className='watchButtons'>
                                        <i className="fa-solid fa-eye fa-xl" style={{ color: "#1ed760" }}></i>
                                    </button>
                                    <button onClick={() => handleUserAction('favourites')} style={{ backgroundColor: favourited ? 'green' : 'transparent' }} className='watchButtons'>
                                        <i className="fa-solid fa-heart fa-xl" style={{ color: "#1ed760" }}></i>
                                    </button>
                                    <button onClick={() => handleUserAction('watchlist')} style={{ backgroundColor: watchlisted ? 'green' : 'transparent' }} className='watchButtons'>
                                        <i className="fa-solid fa-bookmark fa-xl" style={{ color: "#1ed760" }}></i>
                                    </button>
                                    
                                    <button className='button' onClick={()=>{
                                        setIsModalVisibleT(true);
                                        //console.log(trailerUrl);
                                    }} style={{ marginTop: '20px' }}>Watch Trailer</button>
                                </div>
                                <h3>{genres}</h3>
                            </div>
                        </div>
                        <div id="overview">
                            <h3>{data.overview}</h3>
                        </div>
                        <div>
                            {downloadLoading&&<div style={{marginLeft:'5%'}} class="dot-spinner">
                                <div class="dot-spinner__dot"></div>
                                <div class="dot-spinner__dot"></div>
                                <div class="dot-spinner__dot"></div>
                                <div class="dot-spinner__dot"></div>
                                <div class="dot-spinner__dot"></div>
                                <div class="dot-spinner__dot"></div>
                                <div class="dot-spinner__dot"></div>
                                <div class="dot-spinner__dot"></div>
                            </div>}
                            <div className='downBtnContainer'>
                                {downloads.map((down, index) => (
                                   <button className='downBtn' onClick={()=>{
                                    redirect(down.link)
                                   }}>{down.title}-------{down.size}</button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div id="movieCast">
                        <ActorsCarousel actors={actors} />
                    </div>
                </div>
                <div>
                    {!loading && <Similarcarousel type={type} movies={similar} />}
                    {loading && <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}><Loading /></div>}
                </div>
                <div id="commentContainer">
                    <AddCommentInput id={id} onCommentAdded={handleCommentAdded} />
                    {comments.length > 0 && (
                        <div>
                            <h2>Comments:</h2>
                            {comments.map((comment, index) => (
                                <Comment key={index} comment={comment} />
                            ))}
                        </div>
                    )}
                </div>
                <Modal isVisible={isModalVisible} onClose={closeModal}>
                    <VideoPlayer videoUrl={videoUrl} />
                </Modal>
                
                <Modal isVisible={isModalVisibleT} onClose={closeModalT}>
                    <VideoPlayer videoUrl={trailerUrl} />
                </Modal>
            </div>
            <div className="fixed-bottom-right">
                {isChatVisible && (
                <div id="chat">
                    <div className='msg'>
                        {responses.map((response, index) => (
                            <div style={{marginBottom:'10px'}}>
                                <div style={{display:'inline'}} id="picc">
                                    {index%2==0?pic:ai}
                                </div>
                                <p key={index} style={{ color: 'black' ,display:'inline'}}>{response}</p>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    
                    <div>
                        <input onKeyDown={handleKeyDown} ref={inputRef} id='chatInp' type="text" />
                        <button  onClick={send} disabled={isDisabled} className='send'>
                            <i className="fa-solid fa-paper-plane fa-xl" style={{ color: "#1ed760" }}></i>
                        </button>
                    </div>
                </div>
                )}
                <i  id='icon'
                    className="fa-solid fa-robot fa-beat-fade fa-2xl"
                    style={{ color: '#1ed760', cursor: 'pointer' }}
                    onClick={toggleChat}
                ></i>
            </div>
        </div>
    );
};

export default MoviePage;
