import { useEffect, useState } from "react";
import NavBar from "../bars/navBar";
import { useParams } from 'react-router-dom';
import { fetchMoviesWithPage,fetchSeriesWithPage } from "../recommaUtils/apiCalls";
import MovieCard from "./MovieCard";
import { Link } from 'react-router-dom';

const ViewAll = () => {
    let {tvSeries, type, pageNumber, max } = useParams();
    let [prev, setPrev] = useState(true);
    let [next, setNext] = useState(true);
    let [loading, setLoading] = useState(false);
    let [movies, setMovies] = useState([]);

    useEffect(() => {
        setLoading(true); 
        if (pageNumber == 1) {
            setPrev(false);
        } else {
            setPrev(true);
        }
        if (pageNumber == max) {
            setNext(false);
        } else {
            setNext(true);
        }

        const fetchMovies = async () => {
            try {
                let tempMovies = await fetchMoviesWithPage(pageNumber, type);
                setMovies(tempMovies);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching movies:', error);
                setLoading(false);
            }
        };
        const fetchSeries = async () => {
            try {
                let tempMovies = await fetchSeriesWithPage(pageNumber, type);
                setMovies(tempMovies);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching movies:', error);
                setLoading(false);
            }
        };
        //console.log(tvSeries);
        if(tvSeries=="movie"){
            fetchMovies();
        }
        else{
            fetchSeries();
        }

    }, [pageNumber, type, max]);

    return (
        <div>
            <NavBar show={true}/>
            <div id="viewAll">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    movies.map((movie, index) => (
                        <MovieCard
                            key={index}
                            image={movie.poster}
                            name={movie.name==null?movie.title : movie.name }
                            rate={movie.rate}
                            id={movie.id}
                            type={tvSeries}
                        />
                    ))
                )}
            </div>
            <div id="nextPrev">
                {prev && <Link to={`/viewAll/${tvSeries}/${type}/${parseInt(pageNumber) - 1}/${max}`}><h1>Previous</h1></Link>}
                {next && <Link to={`/viewAll/${tvSeries}/${type}/${parseInt(pageNumber) + 1}/${max}`}><h1>Next</h1></Link>}
            </div>
        </div>
    );
}

export default ViewAll;
