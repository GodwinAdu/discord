import { findServersWithChannelByProfileId } from "@/lib/actions/server.actions";
import { currentProfile } from "@/lib/current-profile";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";



interface ServerIdPageProps {
  params: {
    serverId: string;
  }
};

const ServerPage = async ({
  params
}: ServerIdPageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }
  
  const server = await findServersWithChannelByProfileId(profile?._id)
  console.log("what is wrong with this:", server)


  const initialChannel = server[0]?.channels[0];


   console.log(initialChannel)
  if (initialChannel?.name !== "general") {
    return null;
  }

  return redirect(`/servers/${params.serverId}/channels/${initialChannel?.id}`)
}


export default ServerPage