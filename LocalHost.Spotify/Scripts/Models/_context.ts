import { UserProfile } from './_api';
import { IAppModule } from './_config';

export interface IAppState {
    currentUser: UserProfile;
    modules: IAppModule[];
}
