import React, { useState, useEffect, useRef } from 'react';
import Logo from '../assets/logo2.png';
import { useNavigate } from 'react-router-dom';
import { fetchMoviesByQuery } from '../recommaUtils/apiCalls'; // Import your API function for fetching movies

const NavBar = (props) => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    let [pic, setPic] = useState("");
    let [userData, setUserData] = useState(null);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);
    const serachRef = useRef(null);
    let query = useRef('')
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
        //console.log(temp);
        if (temp != null || temp != undefined) {
            //console.log(temp);
            let firstTwoLetters = temp.username.substring(0, 2);
            setPic(firstTwoLetters);
        }
    }, [])
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

    function logOut() {
        localStorage.removeItem('user');
        setUserData(null)
        navigate('/')
        window.location.reload();
    }
    function toWatchlist() {
        navigate('/collection/watchlist');
    }
    function toWatched() {
        navigate('/collection/watched');
    }
    function toFavourites() {
        navigate('/collection/favourites');
    }

    return (
        <div id="navBar">
            <img
                onClick={() => {
                    navigate('/');
                }}
                id="logo"
                src={Logo}
                alt="Logo"
                
            />

            {props.show && (
                <div className="group">
                    <input
                        placeholder="Search"
                        type="search"
                        className="search"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        ref={query}
                    />
                    {searchResults.length > 0 && (
                        <div ref={serachRef} className="search-results">
                            {searchResults.map((movie) => (
                                <div onClick={() => {
                                    navigate(`/${movie.type}/${movie.id}`);
                                    setSearchResults([]);
                                    setSearchQuery("");
                                }} key={movie.id} className="search-result-item">
                                    <img src={movie.poster} alt={movie.name} />
                                    <span>{movie.name}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
            
            {props.show && userData != null &&
                <div ref={dropdownRef} style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
                    <div style={{ display: "flex", alignItems: "center", gap: '5%', cursor: 'pointer' }} onClick={toggleDropdown}>
                        <div id="picc">
                            {pic}
                        </div>
                        <i className="fa-solid fa-caret-down" style={{ color: "#1ed760" }}></i>
                    </div>
                    {isDropdownVisible && (
                        <div style={{ display: 'flex', flexDirection: 'column', position: 'absolute', top: '100%', left: '-15px', backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '5px' }}>
                            <button onClick={toWatched} className='dropBtn' style={{ padding: '10px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>Watched</button>
                            <button onClick={toWatchlist} className='dropBtn' style={{ padding: '10px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>WatchList</button>
                            <button onClick={toFavourites} className='dropBtn' style={{ padding: '10px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>Favourites</button>
                            <button onClick={logOut} className='dropBtn' style={{ padding: '10px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>Log out</button>
                        </div>
                    )}
                </div>

            }
            {
                props.show && userData == null && <h2 onClick={() => {
                    navigate('/login');
                }} style={{ cursor: 'pointer' }}>Log In</h2>
            }
        </div>
    );
};

export default NavBar;
