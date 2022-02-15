import * as React from 'react';
import { UserProfile } from '../../../Models';
 
import './UserProfile.less';


interface IUserProfileProps extends UserProfile { }

export default class UserProfileView extends React.Component<IUserProfileProps> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='userProfile'>
                <h1>{this.props.name}</h1>
                <a href={`mailto:${this.props.email}`}>{this.props.email}</a>
            </div>
        );
    }
}