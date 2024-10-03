"use server"

import Channel from "../models/channel.models";



export const findChannelById = async (channelId:string) => {
  try {
    const channel = await Channel.findById(channelId);

    if (!channel) {
      throw new Error('Channel not found');
    }

    return channel;
  } catch (error) {
    console.error("Error fetching channel:", error);
    throw new Error("Internal Error");
  }
}
