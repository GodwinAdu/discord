"use server"

import Member from "../models/member.models";

export const findMembersByServerAndProfile = async (serverId: string, profileId:string) => {
    try {
      const members = await Member.find({
        server: serverId,
        profile: profileId
      }).populate('server').populate('profile'); // Populate to get full details of the referenced server and profile
  
      return members;
    } catch (error) {
      console.error("Error fetching members:", error);
      throw new Error("Internal Error");
    }
  }
  