import axios from 'axios';

export default {
    //searches for multiple movies
    searchMovies: movie => {
        return axios.get("https://movie-database-imdb-alternative.p.rapidapi.com/?r=json&s=" + movie, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
                "x-rapidapi-key": "A4fAXEqavNmshH7rDZ0elOxkEKP3p1jik56jsnQp8S113Hg0RO"
            }
        })
    },
    //searches for one movie that matches the imdbID
    getMovieID: id => {
        return axios.get(`https://movie-database-imdb-alternative.p.rapidapi.com/?i=${id}&r=json`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
                "x-rapidapi-key": "A4fAXEqavNmshH7rDZ0elOxkEKP3p1jik56jsnQp8S113Hg0RO"
            }
        })
    }

}