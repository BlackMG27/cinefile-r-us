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
    },
    createReview: review => {
        const data = {
            data: review
        }
        return axios.post('/api/review/', data);
    },

    showMovieReviews: id => {
        return axios.get('/api/review/movie/' + id);
    },

    editReview: review => {
        return axios.put('/api/review/edit', review);
    },

    archiveReview: id => {
        return axios.post('/api/review/archive/' + id);
    },

    showUserReviews: id => {
        return axios.get('/api/review/profile/');
    },

    createComment: comment => {
        const data = {
            data: comment
        }
        return axios.post('/api/comment', data);
    },

    showCommentsByReview: id => {
        return axios.get('/api/comment/review/' + id);
    },

    showCommentsByUser: id => {
        return axios.get('/api/comment/profile/' + id);
    },

    archiveComment: id => {
        return axios.post('/api/comment/archive/' + id);
    }

}