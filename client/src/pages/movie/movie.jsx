import React, {Fragment, Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Rating} from 'semantic-ui-react';
import Moment from 'react-moment';
import API from '../../utils/API';
import MovieInfo from '../../components/movie-info/movie-info';
import MovieComment from '../../components/movie-comment/comment';
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
            commentText: '',
            showForm: false,
            showButton: false,
            reviewSubmitted: false,
            reviewCharsLeft: 1000,
            commentCharsLeft: 500,
            commentSubmitted: false,
            showCommentForm: false,
            showSubmitButton: false

        }

    }

    componentDidMount() {
        API.showMovieReviews(this.props.location.state.imdbID).then((res => {
            this.setState({review: res.data});
        })).catch(err => console.log(err));
    }

    showForm = () => {
        this.setState({showForm: true});
    }

    showButton = () => {
        this.setState({showButton: true});
    }

    showCommentButton = () => {
        this.setState({showCommentForm: true})
    }

    showCButton = () => {
        this.setState({showSubmitButton: true})
    }

    showComments = id => {
        let loaded = false;
        if (loaded) {
            console.log(loaded);
            API.showCommentsByReview(id).then(com => {
                this.setState({comment: com.data})
            }).catch(err => console.log(err))
            loaded = true;
        } else {
            return;
        }
    }


    handleRate = (e, {rating, maxRating}) => {
        this.setState({rating, maxRating});
        console.log(this.state.rating);
    }

    onChange = e => {
        this.setState({[e.target.id]: e.target.value});
    }

    onSubmit = e => {
        e.preventDefault();

    }

    commentSetUp = id => {
        let {user} = this.props.auth;
        this.makeComment(user.id, user.username, this.state.commentText, id)

    }

    makeComment = (userId, username, comment, reviewId) => {
        const commentSub = {
            username: username,
            userId: userId,
            commentText: comment,
            reviewId: reviewId
        }

        API.createComment(commentSub).then(res => {
            console.log("Success", res.data)
        }).catch(err => console.log(err))
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
        API.createReview(review).then((review)).catch(err => console.log(err));

    }

    render() {
        let movie = this.props.location.state;
        let {user} = this.props.auth;

        let totalReviewLength = this.state.reviewCharsLeft - this.state.reviewText.length;
        let greaterThan25 = totalReviewLength >= 25;
        let lessThan1000 = totalReviewLength <= 1000;
        let totalCommentLength = this.state.commentCharsLeft - this.state.commentText.length;
        const greaterCThan25 = totalCommentLength >= 25;
        const lessCThan500 = totalCommentLength <= 500;


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
                {
                this.state.review.map(el => (
                    <section className="movie-section"
                        key={
                            el.reviewId
                        }
                        onLoad={
                            () => this.showComments(el.reviewId)
                    }>
                        <div className="row">
                            <div className="movie-review">
                                <h4 className="movie-review__user">
                                    {
                                    el.username
                                }</h4>
                                <h2 className="movie-review__header">
                                    {
                                    el.reviewTitle
                                }</h2>
                                <Rating disabled={true}
                                    maxRating={10}
                                    rating={
                                        el.rating
                                    }
                                    className="movie-review__rating"/>
                                <span className="movie-review__date">
                                    <Moment format="MM-DD-YYYYTHH:mm" parse="YYYY/MM/DD hh:mm">
                                        {
                                        el.createdAt
                                    }</Moment>
                                </span>
                                <p className="movie-review__text">
                                    {
                                    el.reviewText
                                }</p>
                                {
                                (user.id) ? (
                                    <button onClick={
                                            this.showCommentButton
                                        }
                                        className="button comment-button">Make a Comment</button>
                                ) : null
                            } </div>
                        </div>
                        <div className="row">
                            {
                            this.state.showCommentForm ? (
                                <div className="comment-form-area">
                                    <form noValidate
                                        onSubmit={
                                            this.onSubmit
                                        }
                                        className="comment-form">
                                        <div className="form__group">
                                            <label className="form__label" htmlFor="commentText">Make Your Comment</label>
                                            <textarea name="message" id="commentText" cols="30" rows="10" className="form__message"
                                                value={
                                                    this.state.commentText
                                                }
                                                onChange={
                                                    this.onChange
                                                }
                                                onFocus={
                                                    (greaterCThan25 && lessCThan500) ? this.showCButton : null
                                            }></textarea>
                                            <p className="form__chars-left">
                                                {totalCommentLength}
                                                characters left
                                            </p>
                                        </div>
                                        {
                                        this.state.showSubmitButton ? (
                                            <button className="button form__button" type="submit"
                                                onClick={
                                                    () => this.commentSetUp(el.reviewId)
                                            }>
                                                Submit Comment</button>

                                        ) : null
                                    } </form>
                                </div>
                            ) : null
                        } </div>
                        {
                        this.state.comment.map(el => (
                            <MovieComment key={
                                    el.commentId
                                }
                                comment={el}/>
                        ))
                    } </section>

                ))
            } </Fragment>

        )
    }
}

MoviePage.propTypes = {
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({auth: state.auth});
export default connect(mapStateToProps)(MoviePage);
