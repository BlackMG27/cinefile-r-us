import React from 'react';
import Moment from 'react-moment';

const MovieComment = ({comment}) => {
    const {username, commentText, createdAt} = comment;
    return (
        <div className="comment">
            <h3 className="heading-secondary">
                {username}</h3>
            <h5 className="heading-tertiary">
                <Moment format="MM-DD-YYYYTHH:mm" parse="YYYY/MM/DD hh:mm">
                    {createdAt} </Moment>
            </h5>
            <p className="comment__text">
                {commentText}</p>
        </div>
    )
}

export default MovieComment;
