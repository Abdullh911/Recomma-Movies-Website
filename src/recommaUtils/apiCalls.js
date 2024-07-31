export const getCarousel = async (type) =>{
    let result=[];
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjQ3YWZiMWU3ZjAwODk2M2M3MTU4MjM5N2VlNjVjMSIsIm5iZiI6MTcyMDM5MTUwOS4zNTcxNjEsInN1YiI6IjY1NTAxZDM3OTY1M2Y2MDExYmZkYzkzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sJen7_Hqp7vC40W6uNEuL7-ti34E2meYZjtpE2Zyan0'
        }
      };
      
      await fetch(`https://api.themoviedb.org/3/movie/${type}?language=en-US&page=1`, options)
        .then(response => response.json())
        .then(response =>{
           for(let i=0;i<20;i++){
                let vote=response.results[i].vote_average;
                vote=vote.toFixed(1);
                let movie={
                    name:response.results[i].title,
                    poster:"https://image.tmdb.org/t/p/original"+response.results[i].poster_path,
                    id:response.results[i].id,
                    rate:vote
                }
                result.push(movie)
           }
        })
    return result;
}
export const getSeriesCarousel = async (type) =>{
    let result=[];
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjQ3YWZiMWU3ZjAwODk2M2M3MTU4MjM5N2VlNjVjMSIsIm5iZiI6MTcyMDM5MTUwOS4zNTcxNjEsInN1YiI6IjY1NTAxZDM3OTY1M2Y2MDExYmZkYzkzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sJen7_Hqp7vC40W6uNEuL7-ti34E2meYZjtpE2Zyan0'
        }
      };
      
      await fetch(`https://api.themoviedb.org/3/tv/${type}?language=en-US&page=1`, options)
        .then(response => response.json())
        .then(response =>{
           for(let i=0;i<20;i++){
                let vote=response.results[i].vote_average;
                vote=vote.toFixed(1);
                let movie={
                    name:response.results[i].name,
                    poster:"https://image.tmdb.org/t/p/original"+response.results[i].poster_path,
                    id:response.results[i].id,
                    rate:vote
                }
                result.push(movie)
           }
        })
    return result;
}

export const getMoviePageNumbers = async (type) =>{
    let result;
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjQ3YWZiMWU3ZjAwODk2M2M3MTU4MjM5N2VlNjVjMSIsIm5iZiI6MTcyMDM5MTUwOS4zNTcxNjEsInN1YiI6IjY1NTAxZDM3OTY1M2Y2MDExYmZkYzkzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sJen7_Hqp7vC40W6uNEuL7-ti34E2meYZjtpE2Zyan0'
        }
      };
      await fetch(`https://api.themoviedb.org/3/movie/${type}?language=en-US&page=1`, options)
        .then(response => response.json())
        .then(response =>{
            result=response.total_pages;
        })
    return result;
}
export const getSeriesPageNumbers = async (type) =>{
    let result;
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjQ3YWZiMWU3ZjAwODk2M2M3MTU4MjM5N2VlNjVjMSIsIm5iZiI6MTcyMDM5MTUwOS4zNTcxNjEsInN1YiI6IjY1NTAxZDM3OTY1M2Y2MDExYmZkYzkzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sJen7_Hqp7vC40W6uNEuL7-ti34E2meYZjtpE2Zyan0'
        }
      };
      await fetch(`https://api.themoviedb.org/3/tv/${type}?language=en-US&page=1`, options)
        .then(response => response.json())
        .then(response =>{
            result=response.total_pages;
        })
    return result;
}

export const fetchMoviesWithPage = async (pageNumber,type) =>{
    let result=[];
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjQ3YWZiMWU3ZjAwODk2M2M3MTU4MjM5N2VlNjVjMSIsIm5iZiI6MTcyMDM5MTUwOS4zNTcxNjEsInN1YiI6IjY1NTAxZDM3OTY1M2Y2MDExYmZkYzkzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sJen7_Hqp7vC40W6uNEuL7-ti34E2meYZjtpE2Zyan0'
        }
      };
      await fetch(`https://api.themoviedb.org/3/movie/${type}?language=en-US&page=${pageNumber}`, options)
        .then(response => response.json())
        .then(response =>{
           for(let i=0;i<response.results.length;i++){
                let vote=response.results[i].vote_average;
                vote=vote.toFixed(1);
                let movie={
                    name:response.results[i].title,
                    poster:"https://image.tmdb.org/t/p/original"+response.results[i].poster_path,
                    id:response.results[i].id,
                    rate:vote
                }
                result.push(movie)
           }
        })
    return result;
}

export const fetchSeriesWithPage = async (pageNumber,type) =>{
    let result=[];
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjQ3YWZiMWU3ZjAwODk2M2M3MTU4MjM5N2VlNjVjMSIsIm5iZiI6MTcyMDM5MTUwOS4zNTcxNjEsInN1YiI6IjY1NTAxZDM3OTY1M2Y2MDExYmZkYzkzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sJen7_Hqp7vC40W6uNEuL7-ti34E2meYZjtpE2Zyan0'
        }
      };
      await fetch(`https://api.themoviedb.org/3/tv/${type}?language=en-US&page=${pageNumber}`, options)
        .then(response => response.json())
        .then(response =>{
           for(let i=0;i<response.results.length;i++){
                let vote=response.results[i].vote_average;
                vote=vote.toFixed(1);
                let movie={
                    name:response.results[i].name,
                    poster:"https://image.tmdb.org/t/p/original"+response.results[i].poster_path,
                    id:response.results[i].id,
                    rate:vote
                }
                result.push(movie)
           }
        })
    return result;
}

export const fetchMoviesByQuery = async (query) => {
    let result = [];
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjQ3YWZiMWU3ZjAwODk2M2M3MTU4MjM5N2VlNjVjMSIsIm5iZiI6MTcyMDM5MTUwOS4zNTcxNjEsInN1YiI6IjY1NTAxZDM3OTY1M2Y2MDExYmZkYzkzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sJen7_Hqp7vC40W6uNEuL7-ti34E2meYZjtpE2Zyan0'
        }
    };

    await fetch(`https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1`, options)
        .then(response => response.json())
        .then(response => {
            result = response.results.filter(item => item.media_type !== 'person').map(item => ({
                name: item.title==null?item.name:item.title,
                poster: item.poster_path ? `https://image.tmdb.org/t/p/original${item.poster_path}` : '',
                id: item.id,
                type:item.media_type,
                rate:item.vote_average==undefined?0:item.vote_average.toFixed(1),
                popular:item.popularity,
                backdrop:"https://image.tmdb.org/t/p/original"+item.backdrop_path
            }));
        })
        .catch(error => {
            console.error('Error fetching movies:', error);
        });

    return result;
}

export const fetchMediaDetails = async (type,id) =>{
    let result;
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjQ3YWZiMWU3ZjAwODk2M2M3MTU4MjM5N2VlNjVjMSIsIm5iZiI6MTcyMDM5MTUwOS4zNTcxNjEsInN1YiI6IjY1NTAxZDM3OTY1M2Y2MDExYmZkYzkzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sJen7_Hqp7vC40W6uNEuL7-ti34E2meYZjtpE2Zyan0'
        }
      };
      
      await fetch(`https://api.themoviedb.org/3/${type}/${id}?language=en-US`, options)
        .then(response => response.json())
        .then(response => {
            let vote=response.vote_average;
            vote=vote.toFixed(1);
            let obj={
                backdrop:"https://image.tmdb.org/t/p/original"+response.backdrop_path,
                name:response.name==null?response.title:response.name,
                numberOfSeasons:response.number_of_seasons,
                numberOfEpisodes:response.number_of_episodes,
                overview:response.overview,
                poster:"https://image.tmdb.org/t/p/original"+response.poster_path,
                seasons:response.seasons,
                rate:vote,
                genres:response.genres,
                id:id,
                type:type
            }
            result=obj;
        })
        
        return result;
}

export const fetchCharaters = async (type,id) =>{
    let result=[];
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjQ3YWZiMWU3ZjAwODk2M2M3MTU4MjM5N2VlNjVjMSIsIm5iZiI6MTcyMDM5MTUwOS4zNTcxNjEsInN1YiI6IjY1NTAxZDM3OTY1M2Y2MDExYmZkYzkzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sJen7_Hqp7vC40W6uNEuL7-ti34E2meYZjtpE2Zyan0'
        }
      };
      await fetch(`https://api.themoviedb.org/3/${type}/${id}/credits?language=en-US`, options)
        .then(response => response.json())
        .then(response =>{
           for(let i=0;i<response.cast.length;i++){
                if(response.cast[i].known_for_department=="Acting" && response.cast[i].profile_path!=null){
                    let character={
                        name:response.cast[i].name,
                        character:response.cast[i].character,
                        profile:"https://image.tmdb.org/t/p/original"+response.cast[i].profile_path
                    }
                    result.push(character);
                }
           }
        })
    return result;
}
export const getSimilar = async (type, id) => {
    let result = [];
    //console.log(id, type);
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjQ3YWZiMWU3ZjAwODk2M2M3MTU4MjM5N2VlNjVjMSIsIm5iZiI6MTcyMDM5MTUwOS4zNTcxNjEsInN1YiI6IjY1NTAxZDM3OTY1M2Y2MDExYmZkYzkzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sJen7_Hqp7vC40W6uNEuL7-ti34E2meYZjtpE2Zyan0'
        }
    };

    try {
        const response = await fetch(`https://api.themoviedb.org/3/${type}/${id}/similar?language=en-US&page=1`, options);
        const similarData = await response.json();
        if (similarData.results) {
            let tempResult = await getAllSorted(type, id, similarData.total_pages);
            for (let i = 0; i < 30 ; i++) {
                result.push(tempResult[i]);
            }
        }
        //console.log(result);
        return result;
    } catch (error) {
        console.error('Error fetching similar movies:', error);
        return result;
    }
};

export const getAllSorted = async (type, id, max) => {
    let result = [];
    //console.log(id, type);
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjQ3YWZiMWU3ZjAwODk2M2M3MTU4MjM5N2VlNjVjMSIsIm5iZiI6MTcyMDM5MTUwOS4zNTcxNjEsInN1YiI6IjY1NTAxZDM3OTY1M2Y2MDExYmZkYzkzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sJen7_Hqp7vC40W6uNEuL7-ti34E2meYZjtpE2Zyan0'
        }
    };
    let done=50>max?max:50;
    for (let i = 1; i <= done; i++) {
        await fetch(`https://api.themoviedb.org/3/${type}/${id}/similar?language=en-US&page=${i}`, options)
            .then(response => response.json())
            .then(response => {
                for (let j = 0; j < response.results.length; j++) {
                    let vote = response.results[j].vote_average.toFixed(1);
                    let movie = {
                        name: response.results[j].title || response.results[j].name,
                        poster: "https://image.tmdb.org/t/p/original" + response.results[j].poster_path,
                        id: response.results[j].id,
                        rate: parseFloat(vote), 
                        popular: response.results[j].popularity
                    };
                    if (!result.some((m) => m.id === movie.id)) {
                        result.push(movie);
                    }
                    
                }
            });
    }
    result.sort((a, b) => {
        if (a.popular === b.popular) {
            return b.rate - a.rate;
        }
        return b.popular - a.popular;
    });

    return result;
};


export const getAllSortedRecommend = async (choosens) => {
    let result = [];
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjQ3YWZiMWU3ZjAwODk2M2M3MTU4MjM5N2VlNjVjMSIsIm5iZiI6MTcyMDM5MTUwOS4zNTcxNjEsInN1YiI6IjY1NTAxZDM3OTY1M2Y2MDExYmZkYzkzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sJen7_Hqp7vC40W6uNEuL7-ti34E2meYZjtpE2Zyan0'
        }
    };
    let done = 40;

    for (let k = 0; k < choosens.length; k++) {
        let id = choosens[k].id;
        let type = choosens[k].type;

        for (let i = 1; i <= done; i++) {
            await fetch(`https://api.themoviedb.org/3/${type}/${id}/recommendations?language=en-US&page=${i}`, options)
                .then(response => response.json())
                .then(response => {
                    for (let j = 0; j < response.results.length; j++) {
                        let vote = response.results[j].vote_average.toFixed(1);
                        let movie = {
                            name: response.results[j].title || response.results[j].name,
                            poster: "https://image.tmdb.org/t/p/original" + response.results[j].poster_path,
                            id: response.results[j].id,
                            rate: parseFloat(vote),
                            popular: response.results[j].popularity,
                            type:type
                        };

                        if (!result.some((m) => m.id === movie.id)) {
                            result.push(movie);
                        }
                    }
                });
        }
    }
    const chosenIds = new Set(choosens.map(movie => movie.id));
    result = result.filter(movie => !chosenIds.has(movie.id));
    result.sort((a, b) => {
        if (a.popular === b.popular) {
            return b.rate - a.rate;
        }
        return b.popular - a.popular;
    });

    const first30Elements = result.slice(0, 50);
    //console.log(first30Elements);
    return first30Elements;
};


// export const getImdbId=async(name)=>{
//     let newName=name.replace(/\s+/g, '');
//     const url = `https://imdb146.p.rapidapi.com/v1/find/?query=${newName}`;
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'x-rapidapi-key': '30bbe95bb8mshd18d66efbdf604ep1ab26ajsndc5b0723adc1',
// 		'x-rapidapi-host': 'imdb146.p.rapidapi.com'
// 	}
// };

// try {
// 	const response = await fetch(url, options);
// 	const result = await response.json();
//     console.log(result);
//     console.log(result.titleResults.results[0].id);
//     return result.titleResults.results[0].id;
	
// } catch (error) {
// 	console.error(error);
// }

// }


export const getNumberOfEpisodes = async (id, seasonNumber) => {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjQ3YWZiMWU3ZjAwODk2M2M3MTU4MjM5N2VlNjVjMSIsIm5iZiI6MTcyMDM5MTUwOS4zNTcxNjEsInN1YiI6IjY1NTAxZDM3OTY1M2Y2MDExYmZkYzkzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sJen7_Hqp7vC40W6uNEuL7-ti34E2meYZjtpE2Zyan0'
        }
    };

    const response = await fetch(`https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}?language=en-US`, options);
    const data = await response.json();
    
    return data.episodes.length; 
};
export const getTrailer = async (id, type) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjQ3YWZiMWU3ZjAwODk2M2M3MTU4MjM5N2VlNjVjMSIsInN1YiI6IjY1NTAxZDM3OTY1M2Y2MDExYmZkYzkzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7PEbDmBQNqrY3JJ7bRgmJV8S8tPVS8ziZ4TkWSJ2IqU",
      },
    };
    const response = await fetch(`https://api.themoviedb.org/3/${type}/${id}/videos?language=en-US`,options);
    const data = await response.json();
    for (let i = 0; i < data.results.length; i++) {
        if (data.results[i].type === "Trailer") {
        //console.log("https://www.youtube.com/embed/" + data.results[i].key);
        return "https://www.youtube.com/embed/" + data.results[i].key;
        }
    }
  }

  
export const getDownload = async (mName) => {
    //console.log(mName);
    const url = `https://movie_torrent_api1.p.rapidapi.com/search/${mName}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '30bbe95bb8mshd18d66efbdf604ep1ab26ajsndc5b0723adc1',
            'x-rapidapi-host': 'movie_torrent_api1.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        let res=[];
        for(let i=0;i<result.data.length;i++){
            let obj={
                link:result.data[i].magnet,
                title:result.data[i].title,
                size:result.data[i].size
            }
            res.push(obj);
        }
        //console.log(res);
        return res
        
    } catch (error) {
        console.error(error);
    }
  }