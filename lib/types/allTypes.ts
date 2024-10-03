import { Document } from 'mongoose';



// export interface userProps extends Document {
//     userId: string;
//     name: string;
//     imageUrl: string;
//     email: string;
//     createdAt?: Date;  // Optional due to the default value.
//     updatedAt?: Date;  // Optional due to the default value.
//   }

export enum ChannelType {
  TEXT = 'TEXT',
  AUDIO = 'AUDIO',
  VIDEO = 'VIDEO'
}

// export interface channelProps extends Document {
//   name: string;
//   type: ChannelType;
//   profileId: string | Document;  // If you populate this field with a full User document, it would be a Document type. If not, it's just a string (ObjectId).
//   createdAt?: Date;  // The '?' denotes this field as optional since it has a default value.
//   updatedAt?: Date;  // Same reasoning as above.
// }

export enum MemberRole {
    ADMIN = 'ADMIN',
    MODERATOR = 'MODERATOR',
    GUEST = 'GUEST'
  }
  
//   export interface memberProps extends Document {
//     role: MemberRole;
//     profile: string | Document;  // If you populate this field with a full User document, it would be a Document type. If not, it's just a string (ObjectId).
//     server: string | Document;   // Similarly, if you populate this with a full Server document, it's a Document. Otherwise, it's a string (ObjectId).
//     createdAt?: Date;  // Optional because of the default value.
//     updatedAt?: Date;  // Optional because of the default value.
//   }


//   export interface serverProps extends Document {
//     name: string;
//     imageUrl: string;
//     inviteCode: string;
//     owner: string | Document;   // If you populate this field with the full User document, then it would be a Document type. Otherwise, it's just a string representing ObjectId.
//     members: (string | Document)[];  // Similarly, depending on whether you populate it with full Member documents or not.
//     channels: (string | Document)[];  // Depending on whether you populate it with full Channel documents or not.
//     createdAt?: Date;  // Optional due to the default value.
//     updatedAt?: Date;  // Optional due to the default value.
//   }


  export interface UserProps {
    _id: string;
    userId: string;
    name: string;
    imageUrl: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface ChannelProps {
    _id: string;
    name: string;
    type: 'TEXT' | 'AUDIO' | 'VIDEO';
    profileId: UserProps;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface MemberProps {
    _id:string;
    role: 'ADMIN' | 'MODERATOR' | 'GUEST';
    profile: UserProps;
    server: populatedServerProps;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface populatedServerProps {
    _id: string;
    name: string;
    imageUrl: string;
    inviteCode: string;
    owner: UserProps;
    members: MemberProps[];
    channels: ChannelProps[];
    createdAt: Date;
    updatedAt: Date;
  }