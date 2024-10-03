"use server"

import mongoose from "mongoose";
import Server from "../models/server.models";
import { connectToDB } from "../mongoose";
import { v4 as uuidv4 } from 'uuid';
import { currentProfile } from "../current-profile";
import Channel from "../models/channel.models";
import Member from "../models/member.models";

import User from "../models/user.models";



export async function findServersByProfileId(profileId: string) {
  connectToDB();
  try {

    const members = await Member.find({ profileId: profileId });
    const memberIds = members.map(member => member._id);
    const server = await Server.findOne({ members: { $in: memberIds } });

    return server;
  } catch (error) {
    console.error('Error finding servers:', error);
    throw error;
  }
}


export async function findServersWithChannelByProfileId(profileId: string) {
  connectToDB();
  try {

    const members = await Member.find({ profileId: profileId });
    const memberIds = members.map(member => member._id);
    // Find servers that these members are a part of
    const servers = await Server.find({ members: { $in: memberIds } })
    .populate({
      path: "owner",
      model: User,
    })
    .populate({
        path: "channels",
        model: Channel,
        populate: {
          path: "profileId",
          model: User,
          select: "_id userId name imageUrl email"
        }
      })
      .populate({
        path: "members",
        model: Member,
        populate: {
          path: "profile",
          model: User,
          select: "_id userId name imageUrl email"
        }
      })
      .exec()
    

    return servers;
  } catch (error) {
    console.error('Error finding servers:', error);
    throw error;
  }
}

export async function findAllServersByProfileId(profileId: string) {
  connectToDB();
  try {

    const members = await Member.find({ profileId });
    const memberIds = members.map(member => member._id);
    const servers = await Server.find({ members: { $in: memberIds } });

    return servers;
  } catch (error) {
    console.error('Error finding servers:', error);
    throw error;
  }
}

export const findServerWithMembersByProfileId = async (serverId:string, profileId: string) => {
  try {
    const server = await Server.findOne({ _id: serverId })
      .populate({
        path: 'members',
        match: { profile: profileId },  // This filters the members based on profileId
        populate: {
          path: 'profile',
          model: 'User'  // Adjust the model name as needed
        }
      });

    if (!server) {
      throw new Error('Server not found');
    }

    return server;
  } catch (error) {
    console.error("Error fetching server and members:", error);
    throw new Error("Internal Error");
  }
}



/**
 * Create a new server.
 * 
 * @param serverData The server details.
 * @returns The created server document.
 * 
 */
interface createServerProps {
  name: string,
  imageUrl: string,
}

export async function createNewServer({ name, imageUrl }: createServerProps) {
  connectToDB();  // Connect to MongoDB
  try {
    const profile = await currentProfile();

    if (!profile) {
      throw new Error("Unauthorized");
    }

    // Create the default channel
    const defaultChannel = await Channel.create({
      name: "general",
      profileId: profile._id
    });

    // Create the server with the default channel
    const server = await Server.create({
      name,
      imageUrl,
      inviteCode: uuidv4(),
      channels: [defaultChannel._id],
      owner: profile._id
    });

    // Create the default member (admin) and reference the server
    const adminMember = await Member.create({
      profile: profile._id,
      role: 'ADMIN',
      server: server._id  // Reference the server in the member
    });

    // Associate the member with the server
    server.members.push(adminMember._id);
    await server.save();

    return server;
  } catch (error) {
    console.log("[SERVERS_POST]", error);
    throw new Error("Internal Error");
  }
}
