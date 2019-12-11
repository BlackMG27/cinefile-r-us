import React, {Component, Fragment} from 'react';
import Moment from 'react-moment';
import {connect} from 'react-redux';
import {Rating} from 'semantic-ui-react';
import API from '../../utils/API';
import MovieComment from '../movie-comment/comment';

class MovieReview extends Component {
    constructor() {
        super();
        this.state = {
            comment: [],
            commentText: '',
            commentCharLeft: 500,
            commentSubmitted: false,
            showCommentForm: false,
            showSubmitButton: false
        }
    }

    componentDidMount() {
        let {reviewId} = this.props.review;
        API.showCommentsByReview(reviewId).then(res => {
            this.setState({comment: res.data})
        }).catch(err => console.log(err))
    }

    showCommentButton = () => {
        this.setState({showCommentForm: true})
    }

    showCButton = () => {
        this.setState({showSubmitButton: true})
    }

    onChange = e => {
        this.setState({[e.target.id]: e.target.value});
    }


    handleCSubmit = (id) => {
        let {user} = this.props.auth;
        this.setState({commentSubmitted: true});
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
            API.showCommentsByReview(reviewId).then(res => {
                this.setState({comment: res.data})
            })
        }).catch(err => console.log(err))
    }

    render() {

        let {
            username,
            reviewTitle,
            rating,
            reviewText,
            createdAt,
            reviewId
        } = this.props.review;
        let {user} = this.props.auth;
        let totalCommentLength = this.state.commentCharsLeft - this.state.commentText.length;
        const greaterCThan25 = totalCommentLength >= 25;
        const lessCThan500 = totalCommentLength <= 500;


        return (
            <Fragment>
                <section className="movie-section">
                    <div className="row">
                        <div className="movie-review">
                            <h4 className="movie-review__user">
                                {username}</h4>
                            <h2 className="movie-review__header">
                                {reviewTitle}</h2>
                            <Rating disabled={true}
                                maxRating={10}
                                rating={rating}
                                className="movie-review__rating"/>
                            <span className="movie-review__date">
                                <Moment format="MM-DD-YYYYTHH:mm" parse="YYYY/MM/DD hh:mm">
                                    {createdAt}</Moment>
                            </span>
                            <p className="movie-review__text">
                                {reviewText}</p>
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
                                        this.handleCSubmit(reviewId)
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
                                                (greaterCThan25 && lessCThan500) ? this.showButton : null
                                        }></textarea>
                                        <p className="form__chars-left">
                                            {totalCommentLength}&nbsp; characters left
                                        </p>
                                    </div>
                                    {
                                    this.state.showSubmitButton ? (
                                        <button className="button form__button" type="submit">
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
            </Fragment>
        )
    }
}
const mapStateToProps = state => ({auth: state.auth});
export default connect(mapStateToProps)(MovieReview);
