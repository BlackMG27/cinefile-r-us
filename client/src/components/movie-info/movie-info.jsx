import React, {Fragment} from 'react';

const MovieInfo = ({movie}) => {
    const {
        Title,
        Actors,
        Poster,
        Genre,
        Rated,
        Plot,
        Released,
        Runtime,
        Language,
        Year,
        Director,
        Writer,
        Production,
        Ratings,
        Country,
        BoxOffice
    } = movie;

    return (
        <Fragment>
            <section className="movie-info">
                <div className="movie-info__container">
                    <div className="row">
                        <h2 className="heading-secondary">
                            {Title}</h2>

                        <div className="col-1-of-2">
                            <img src={Poster}
                                alt={
                                    `${Title} poster`
                                }
                                className="movie-info__photo"/></div>
                    <div className="col-1-of-2">
                        <div className="movie-info__stats">
                            <ul className="movie-info__stats-list">
                                <li className="movie-info__stats-item">Rated: {Rated}</li>
                                <li className="movie-info__stats-item">Released: {Released}</li>
                                <li className="movie-info__stats-list">
                                    Year: {Year} </li>

                                <li className="movie-info__stats-item">Box Office: {BoxOffice}</li>
                                <li className="movie-info__stats-item">Production: {Production}</li>
                                <li className="movie-info__stats-item">Country: {Country}</li>
                                <li className="movie-info__stats-item">Language: {Language}</li>
                            </ul>
                        </div>
                        <div className="movie-info__stats">
                            <ul className="movie-info__stats-list">
                                <li className="movie-info__stats-item">Runtime: {Runtime}</li>
                                {
                                Ratings.map((rating, index) => (
                                    <li className="movie-info__stats-item"
                                        key={index}>
                                        {
                                        rating.Source
                                    }: {
                                        rating.Value
                                    }</li>
                                ))
                            } </ul>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="movie-info__stats">
                        <ul className="movie-info__stats-list">
                            <li className="movie-info__stats-list">Actors: {Actors}</li>
                            <li className="movie-info__stats-list">Genre: {Genre}</li>
                            <li className="movie-info__stats-list">Director: {Director}</li>
                            <li className="movie-info__stats-list">Writer(s): {Writer}</li>
                            <li className="movie-info__stats-list">Plot: {Plot}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    </Fragment>


    )
}

export default MovieInfo;
