import { auth } from "@clerk/nextjs"
import { fetchUser } from "./actions/user.actions";

export const currentProfile = async () => {
    const { userId } = auth();

    if (!userId) return null;

    const profile = await fetchUser(userId);

    return profile;
}