import React, {Fragment, Component} from 'react';
import API from "../../utils/API";
class SearchPage extends Component {

    state = {
        query: '',
        movies: [],
        id: ''
    }


    searchMovies = movie => { // replace all the spaces so that it goes through
        movie = movie.replace(/ /g, '%20');
        // put movie through the api
        API.searchMovies(movie).then(res => {
            this.setState({movies: res.data.Search})
        }).catch(err => console.log(err));
    }

    getID = id => {
        API.getMovieID(id).then(res => {
            const movie = res.data;
            // put movie info to MoviePage component
            this.props.history.push(`/movie/${
                movie.imdbID
            }`, movie);
        }).catch(err => console.log(err));
    }

    onChange = e => {
        this.setState({[e.target.id]: e.target.value});
    }

    onSubmit = e => {
        e.preventDefault();
        this.searchMovies(this.state.query);
    }

    render() {
        return (
            <Fragment>
                <section className="search-title">
                    <div className="row">
                        <h1 className="heading-primary">
                            Welcome to Cinefile-R-Us !</h1>
                    </div>
                </section>
                <section className="search">
                    <div className="row">
                        <form className="search-form u-margin-bottom-big" noValidate
                            onSubmit={
                                this.onSubmit
                        }>
                            <div className="search-form__group">
                                <label className="search-form__label" htmlFor="query">Search For Any Movie!</label>
                                <input onChange={
                                        this.onChange
                                    }
                                    value={
                                        this.state.query
                                    }
                                    type="text"
                                    id="query"
                                    className="search-form__input"/>
                            </div>
                            <button className="button search-form__button" type="submit">Search Movies!</button>
                        </form>
                    </div>
                </section>
                <section className="search-results">
                    <div className="row">
                        {

                        this.state.movies.map((movie, index) => <div className="movie-result"
                            key={index}>
                            <div className="movie-result__container">
                                <img className="movie-result__photo"
                                    src={
                                        movie.Poster
                                    }
                                    alt={
                                        `${
                                            movie.Title
                                        } poster`
                                    }/>
                            </div>
                        <div className="movie-result__text-box">
                            <h4 className="movie-result__title">
                                {
                                movie.Title
                            }</h4>
                            <h5 className="movie-result__year">
                                {
                                movie.Year
                            }</h5>
                            <button className="button movie-result__button"
                                onClick={
                                    () => this.getID(movie.imdbID)
                            }>Learn More</button>
                        </div>
                    </div>)
                    } </div>
                </section>
            </Fragment>
        )
    }
}

export default SearchPage;
