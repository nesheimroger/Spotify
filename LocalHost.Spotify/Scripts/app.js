import React from 'react';

import UserProfile from './components/UserProfile';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userProfile: null
        }
    }

    componentDidMount() {
        var self = this;

        fetch("/api/user")
            .then(res => res.json())
            .then(user => {
                self.setState({ userProfile: user })
            });
    }

    render() {
        if (!this.state.userProfile) return (<div>Loading...</div>);

        return (
            <div className="app-container">
                <div className="app-header">
                    <div className="app-logo"><h1>Spotify</h1></div>
                    <UserProfile
                        name={this.state.userProfile.name}
                        email={this.state.userProfile.email}
                    />
                </div>
                <div className="app-content">
                    Content
                </div>

                
            </div>
        );
    }
}