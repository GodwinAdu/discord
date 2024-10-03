import {InitialModal} from "@/components/modals/InitialModal";
import { findServersByProfileId } from "@/lib/actions/server.actions";
import { initialProfile } from "@/lib/initial-profile"
import { redirect } from "next/navigation"


const SetupPage = async () => {

  const profile = await initialProfile();


  const server = await findServersByProfileId(profile?._id)

 console.log("server:", server)
  if(server){
    return redirect(`/servers/${server?._id}`)
  }
  
  return <InitialModal />
}

export default SetupPage
