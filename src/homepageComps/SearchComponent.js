import React, { useState, useRef } from 'react';
import { fetchMoviesByQuery } from '../recommaUtils/apiCalls';

const SearchComponent = ({ onMovieSelect }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const searchRef = useRef(null);

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

    return (
        <div className="search-container">
            <input
                placeholder="Search"
                type="search"
                className="search-input"
                value={searchQuery}
                onChange={handleSearchChange}
                ref={searchRef}
            />
            {searchResults.length > 0 && (
                <div className="search-results">
                    {searchResults.map((movie) => (
                        <div
                            onClick={() => {
                                onMovieSelect(movie);
                                setSearchResults([]);
                                setSearchQuery('');
                            }}
                            key={movie.id}
                            className="search-result-item"
                        >
                            <img src={movie.poster} alt={movie.name} />
                            <span>{movie.name}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchComponent;
