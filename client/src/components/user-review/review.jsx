import React, {Fragment, Component} from 'react';

class UserReview extends Component {
    constructor() {
        super();
        this.state = {
            showEditForm: false

        }
    }
    render() {
        const {
            reviewText,
            reviewTitle,
            movieTitle,
            rating,
            createdAt,
            updatedAt
        } = this.props.review;
        return (
            <Fragment>
                <div className="profile-data__review"></div>
            </Fragment>
        )
    }
}

export default UserReview;
