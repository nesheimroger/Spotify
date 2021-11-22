import React from 'react';

import './UserProfile.less'

export default class UserProfile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="user-profile">
                <h1>{this.props.name}</h1>
                <a href={`mailto:${this.props.email}`}>{this.props.email}</a>
            </div>
        );
    }
}