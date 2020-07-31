const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String
    jobTitle: String
    location: String
    languages: [String!]
    about: String
    ownedVideos: [Video!]
    userComments: [Comment!]
    playlistComments: [Comment!]
    favourites: [String!]
    profilePhotoFilename: String
  }

  type Video {
    _id: ID!
    title: String!
    thumbnailURL: String!
    videoURL: String!
    owner: User!
  }

  type Comment {
    _id: ID!
    content: String!
    commenter: User!
    playlistOwner: User!
    createdAt: String!
    updatedAt: String!
  }

  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }

  input UserInput{
    firstName: String! 
    lastName: String! 
    email: String!
    password: String!
  }

  input ProfileInput{
    firstName: String! 
    lastName: String! 
    jobTitle: String
    location: String
    languages: [String]
    about: String
  }

  input VideoInput{
    title: String! 
    thumbnailURL: String! 
    videoURL: String!
    userId: String!
  }

  input CommentInput{
    content: String!
    commenterId: String!
    playlistOwnerId: String!
  }

  type RootQuery {
    users: [User!]!
    userById(id: String!): User!
    userByToken: User!
    videos: [Video!]!
    comments: [Comment!]!
    login(email: String!, password: String!): AuthData
  }

  type RootMutation {
    createUser(userInput: UserInput): User
    updateUser(profileInput: ProfileInput): User
    createVideo(videoInput: VideoInput): Video
    removeVideo(id: String!): User
    createComment(commentInput: CommentInput): Comment
    editComment(id: String!, content: String!): Comment
    removeComment(id: String!, playlistOwnerId: String!): User
    addFavourite(id: String!): User!
    removeFavourite(id: String!): User!

  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`)