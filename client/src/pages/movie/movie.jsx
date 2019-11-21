import React, {Fragment, Component} from 'react';

class MoviePage extends Component {

    render() {
        const movie = this.props.location.state;
        console.log(movie);
        const {
            Title,
            Actors,
            Poster,
            Genre,
            Rated,
            Plot,
            Released,
            Director,
            Writer,
            imdbID,
            Production,
            Ratings,
            Country,
            BoxOffice
        } = movie;
        return (
            <Fragment>
                <section className="movie-info">
                    <div className="row">
                        <h1>{Title}</h1>
                    </div>
                </section>
            </Fragment>
        )
    }
}

export default MoviePage;
