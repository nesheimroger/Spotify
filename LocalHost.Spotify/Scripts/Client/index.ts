import { UserProfile } from "../Models";

export default {
    currentUser: async (): Promise<UserProfile> => {
        var response = await fetch("/api/user");
        var json = await response.json();
        return json as UserProfile;
    }
}