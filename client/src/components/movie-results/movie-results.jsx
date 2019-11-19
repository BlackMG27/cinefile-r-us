import React, {Fragment} from 'react';


const MovieResults = (props) => {
    const {Title, Year, imdbID, Poster} = props;
    return (
        <Fragment>
            <div className="movie-result">
                <div className="movie-result__container">
                    <img class="movie-result__photo"
                        src={Poster}
                        alt={
                            `${Title} poster`
                        }/>
                </div>
            <div className="movie-result__text-box">
                <h4 className="movie-result__title">
                    {Title}</h4>
                <h5 className="movie-result__year">
                    {Year}</h5>
                <button class="button movie-result__button">Learn More</button>
            </div>
        </div>
    </Fragment>
    )
}

export default MovieResults;
