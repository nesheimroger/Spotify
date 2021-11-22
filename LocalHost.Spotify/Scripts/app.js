import React from 'react';

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
            <div>
                <h1>{this.state.userProfile.name}</h1>
                <div>{this.state.userProfile.email}</div>
            </div>
        );
    }
}