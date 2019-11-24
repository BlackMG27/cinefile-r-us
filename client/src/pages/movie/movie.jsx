import React, {Fragment, Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Rating} from 'semantic-ui-react';
import API from '../../utils/API';
import MovieInfo from '../../components/movie-info/movie-info';
class MoviePage extends Component {
    constructor() {
        super();
        this.state = {
            reviewTitle: '',
            reviewRating: 3,
            reviewText: '',
            movieTitle: '',
            imdbID: '',
            reviewer: '',
            commenter: '',
            commentText: '',
            showForm: false,
            showButton: false,
            reviewSubmitted: false,
            commentSubmitted: false,
            reviewCharsLeft: 1000,
            commentCharsLeft: 500
        }

    }

    componentDidMount() {
        API.showMovieReviews(this.props.location.state.imdbID).then((reviews => {
            API.showCommentsByReview(reviews.reviewId).then(comment => console.log("Success", comment)).catch(err => console.log(err));
        })).catch(err => console.log(err));
    }

    showForm = () => {
        this.setState({showForm: true});
    }

    showButton = () => {
        this.setState({showButton: true});
    }

    handleRate = (e, {rating, maxRating}) => {
        this.setState({rating, maxRating});
    }

    onChange = e => {
        this.setState({[e.target.id]: e.target.value});
    }

    onSubmit = e => {
        e.preventDefault();
        this.setState({reviewSubmitted: true})

        this.makeReview(this.state.reviewer, this.state.imdbID, this.state.reviewTitle, this.state.reviewRating, this.state.reviewText, this.state.movieTitle);


    }

    makeReview = (reviewer, id, title, rating, text, mTitle) => {

        const review = {
            reviewer: reviewer,
            imdbId: id,
            reviewTitle: title,
            rating: rating,
            reviewText: text,
            movieTitle: mTitle
        }
        API.createReview(review).then((review)).catch(err => console.log(err));

    }

    render() {
        const movie = this.props.location.state;
        const {user} = this.props.auth;
        const movieID = movie.imdbID;
        const title = movie.Title;
        let totalReviewLength = this.state.reviewCharsLeft - this.state.reviewText.length;
        let totalCommentLength = this.state.commentCharsLeft - this.state.commentText.length;
        const greaterThan25 = totalReviewLength >= 25;
        const lessThan1000 = totalReviewLength <= 1000;

        return (
            <Fragment>
                <MovieInfo movie={movie}/>
                <section className="make-review">

                    {
                    (user.id) ? (

                        <div className="row">
                            <div className="make-review__heading">
                                <h3 className="heading-tertiary">
                                    Want to make a review, {
                                    user.username
                                }
                                    ?
                                </h3>
                                <button className="button button__make-review"
                                    onClick={
                                        this.showForm
                                }>Make a Review
                                </button>

                            </div>

                        </div>

                    ) : null
                }
                    {
                    this.state.showForm ? (
                        <div className="make-review__form-area">
                            <form noValidate className="make-review__form"
                                onSubmit={
                                    this.onSubmit
                            }>
                                <h5 className="heading-5"
                                    defaultValue={
                                        this.state.reviewer
                                }>
                                    {
                                    user.username
                                }</h5>
                                <p style={
                                        {display: 'none'}
                                    }
                                    defaultValue={
                                        this.state.imdbID
                                }>
                                    {movieID}</p>
                                <p style={
                                        {display: 'none'}
                                    }
                                    value={
                                        this.state.movieTitle
                                }>
                                    {title}</p>
                                <div className="form__group">
                                    <label className="form__label" htmlFor="reviewTitle">Review Title</label>
                                    <input type="text"
                                        value={
                                            this.state.reviewTitle
                                        }
                                        id="reviewTitle"
                                        onChange={
                                            this.onChange
                                        }/>
                                </div>
                                <div className="form__group">
                                    <label className="form__label" htmlFor="reviewRating">Rating</label>
                                    <Rating defaultRating={3}
                                        maxRating={5}
                                        icon="star"
                                        size="huge"
                                        value={
                                            this.state.reviewRating
                                        }
                                        onRate={
                                            this.handleRate
                                        }/>

                                </div>
                                <div className="form__group">
                                    <label className="form__label" htmlFor="reviewText">Review</label>

                                    <textarea name="message" id="reviewText" cols="30" rows="10"
                                        onChange={
                                            this.onChange
                                        }
                                        value={
                                            this.state.reviewText
                                        }

                                        onFocus={
                                            (greaterThan25 && lessThan1000) ? this.showButton : null
                                        }

                                        className="form__message"></textarea>
                                    <p className="form__char-left">
                                        {totalReviewLength}
                                        &nbsp;characters remaining</p>
                                </div>
                                {
                                this.state.showButton ? (
                                    <button className="button form__button">Submit Review</button>
                                ) : null
                            } </form>
                        </div>
                    ) : null
                } </section>

            </Fragment>

        )
    }
}

MoviePage.propTypes = {
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({auth: state.auth});
export default connect(mapStateToProps)(MoviePage);
