"use server"

import mongoose from "mongoose";
import User from "../models/user.models";
import { connectToDB } from "../mongoose";


export async function fetchUser(userId: string) {
  connectToDB();
    try {
  
      return await User.findOne({ id: userId })
    } catch (error: any) {
      throw new Error(`Failed to fetch user: ${error.message}`);
    }
}


interface Params {
    userId: string | undefined;
    name: string;
    imageUrl: string | undefined;
    email: string | undefined;
  }

  export async function createUser(userData: Params): Promise<void> {
    const user = new User({
      userId: userData.userId,
      name: userData.name,
      imageUrl: userData.imageUrl,
      email: userData.email,
      // createdAt and updatedAt will be auto-populated due to the default values in schema
    });
  
    try {
        await connectToDB();

      const savedProfile = await user.save();
      console.log('Profile saved:', savedProfile);
      return savedProfile;
    } catch (error: any) {
      console.error('Error saving the profile:', error.message);
      throw error;  // or handle it in another way suitable for your app
    }
  }