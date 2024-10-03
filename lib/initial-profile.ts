import { currentUser, redirectToSignIn } from "@clerk/nextjs"
import { createUser, fetchUser } from "./actions/user.actions";


export const initialProfile = async () => {
    const user = await currentUser();

    const userData = {
        userId: user?.id,
        name: `${user?.firstName} ${user?.lastName}`,
        imageUrl: user?.imageUrl,
        email:user?.emailAddresses[0].emailAddress,
    
    }

    if (!user) {
        return redirectToSignIn()
    }

    const profile = await fetchUser(user.id);

    if (profile) {
        return profile
    }

    const newProfile = await createUser(userData)

    return newProfile;    
};