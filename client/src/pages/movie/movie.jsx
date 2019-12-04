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
            rating: 5,
            reviewText: '',
            movieTitle: '',
            imdbID: '',
            reviewer: '',
            review: [],
            comment: [],
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
        API.showMovieReviews(this.props.location.state.imdbID).then((res => {
            this.setState({
                review: res.data.review.filter(review => review.activeReview)
            })

        })).catch(err => console.log(err));
    }

    componentDidUpdate() {
        API.showMovieReviews(this.props.location.state.imdbID).then((res => {
            this.setState({
                review: res.data.review.filter(review => review.activeReview)
            })
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
        console.log(this.state.rating);
    }

    onChange = e => {
        this.setState({[e.target.id]: e.target.value});
    }

    handleSubmit = e => {
        e.preventDefault();
        let {user} = this.props.auth;
        let movie = this.props.location.state;
        this.setState({reviewSubmitted: true})
        this.makeReview(user.username, movie.imdbID, this.state.reviewTitle, this.state.rating, this.state.reviewText, movie.Title, user.id);
        // send the form elements to the REST api

    }

    makeReview = (reviewer, id, title, rating, text, mTitle, userId) => { // creates the object to send to the REST api
        const review = {
            reviewer: reviewer,
            imdbId: id,
            reviewTitle: title,
            rating: rating,
            reviewText: text,
            movieTitle: mTitle,
            UserUserId: userId
        }
        // sends object to the REST API
        console.log(review);
        API.createReview(review).then((review => console.log("Success", review))).catch(err => console.log(err));

    }

    render() {
        let movie = this.props.location.state;
        let {user} = this.props.auth;
        const username = {
            [this.state.reviewer]: user.username
        };
        const movieID = {
            [this.state.imdbID]: movie.imdbID
        };
        const title = {
            [this.state.movieTitle]: movie.Title
        };
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
                                    this.handleSubmit
                            }>
                                <div className="form__group">
                                    <label className="form__label" htmlFor="reviewer">Reviewer</label>
                                    <input type="text" className="form__input" readOnly

                                        value={
                                            username[this.state.reviewer]
                                        }
                                        id="reviewer"
                                        required/>
                                </div>
                                <div className="form__group">
                                    <label className="form__label" htmlFor="movieID">Movie ID</label>
                                    <input type="text" className="form__input" readOnly

                                        value={
                                            movieID[this.state.imdbID]
                                        }
                                        required/>
                                </div>
                                <div className="form__group">
                                    <label className="form__label" htmlFor="movieTitle">Movie Title</label>
                                    <input type="text" className="form__input" readOnly

                                        value={
                                            title[this.state.movieTitle]
                                        }
                                        required/>
                                </div>
                                <div className="form__group">
                                    <label className="form__label" htmlFor="reviewTitle">Review Title</label>
                                    <input type="text" required
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
                                    <Rating maxRating={10}
                                        defaultRating={1}
                                        icon="star"
                                        size="huge"
                                        id="reviewRating"
                                        onRate
                                        ={this.handleRate}
                                        required/>

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
                                        required
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
                <section className="review__list"></section>

            </Fragment>

        )
    }
}

MoviePage.propTypes = {
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({auth: state.auth});
export default connect(mapStateToProps)(MoviePage);
