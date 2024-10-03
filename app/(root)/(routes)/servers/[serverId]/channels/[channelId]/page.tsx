import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";


import { currentProfile } from "@/lib/current-profile";
import { ChatHeader } from "@/components/chat/chat-header";
// import { ChatInput } from "@/components/chat/chat-input";
// import { ChatMessages } from "@/components/chat/chat-messages";
// import { MediaRoom } from "@/components/media-room";
import { findChannelById } from "@/lib/actions/channel.actions";
import { findMembersByServerAndProfile } from "@/lib/actions/member.actions";
import { ChannelType } from "@/lib/types/allTypes";


interface ChannelIdPageProps {
  params: {
    serverId: string;
    channelId: string;
  }
}


const ChannelIdPage = async ({
  params
}: ChannelIdPageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const channel = await findChannelById(params.channelId)

  const member = await findMembersByServerAndProfile(params.serverId, profile?._id) 

  console.log("channel and member", channel , member)

  if (!channel || !member) {
    redirect("/");
  }

  return ( 
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      hello world
    </div>
   );
}
 
export default ChannelIdPage;