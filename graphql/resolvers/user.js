const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const session = require('express-session');
// Creates an instance of our models (DB collection).
const User = require('../../models/User');
// const ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
  // Query all users
  users: async () => {
    try {
      const users = await User.find()
      return users.map(user => {
        return { ...user._doc, _id: user.id };
      })
    } catch (err) {
      throw err
    }
  },

  // Query a single user by id
  userById: async (args, req, res) => {
    // console.log(res)

    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // } 
    try {
      // console.log(args.firstName);
      const foundUser = await User.findById(args.id);
      // console.log(foundUser);
      if (!foundUser) {
        throw new Error('User does not exist!')
      }
      return { ...foundUser._doc, _id: foundUser.id };
      // }
    } catch (err) {
      throw err
    }
  },


  // Query a single user data using the token
  userByToken: async (_, req, res) => {
    // console.log(res)

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    } 
    try {
      // console.log(args.firstName);
      const foundUser = await User.findById(req.userId);
      // console.log(foundUser);
      if (!foundUser) {
        throw new Error('User does not exist!')
      }
      return { ...foundUser._doc, _id: foundUser.id };
      // }
    } catch (err) {
      throw err
    }
  },




  // Create a user
  createUser: async (args) => {
    try {
      // Check if the email already exists
      const existingUser = await User.findOne({ email: args.userInput.email })
      // if a user exists i.e. not undefined
      if (existingUser) {
        throw new Error('Email address is already taken.')
      }
      // Hash the password
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12)
      // Create a new user instance
      const user = new User({
        firstName: args.userInput.firstName,
        lastName: args.userInput.lastName,
        email: args.userInput.email,
        password: hashedPassword,
        jobTitle: null,
        location: null,
        languages: [],
        about: null,
        ownedVideos: [],
        userComments: [],
        playlistComments: [],
        favourites: [],
        profilePhotoFilename: null
      });

      const res = await user.save();
      return { ...res._doc, password: null, _id: user.id }; // Note .id is a shortcut provided by mongoose which converts the mongoDB objectID to a string - instead of us doing _id: user._doc._id.toString();

    } catch (err) {
      throw err
    }
  },


  // Update a user
  updateUser: async (args, req) => {
    try {

      console.log(args)
      
      // Get the user's info
      const user = await User.findById(req.userId);

      // Update the info
      user.firstName = args.profileInput.firstName;
      user.lastName = args.profileInput.lastName;
      user.jobTitle = args.profileInput.jobTitle;
      user.location = args.profileInput.location;
      user.languages = args.profileInput.languages;
      user.about = args.profileInput.about;

      // console.log(user);

      const res = await user.save();
      return { ...res._doc, password: null, _id: user.id }; // Note .id is a shortcut provided by mongoose which converts the mongoDB objectID to a string - instead of us doing _id: user._doc._id.toString();

    } catch (err) {
      throw err
    }
  },

  // login
  login: async ({ email, password}, req, res) => {
    // console.log('context', context.session)
    // Validate email and password
    const user = await User.findOne({email: email});
    if (!user) {
      throw new Error('User does not exist!')
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error('Password is incorrect');
    }
    // Create the token
    const token = jwt.sign(
      { userId: user.id, email: user.email }, "ojwafwe5f1weeD4F4fwfwjkjK5SHhwqFlfj6hewjf1EFDSF5SDFjn6Suvref564f", 
      // {expiresIn: '1h'}
    );

    // Create a session for the user - set the user id on the session
    // Express-session will add a cookie for the user
    const options = {
      maxAge: 1000 * 60 * 60 * 24, //expires in a day
      domain: 'http://localhost:3000'
      // httpOnly: true, // cookie is only accessible by the server
      // secure: process.env.NODE_ENV === 'prod', // only transferred over https
      // sameSite: true, // only sent for requests to the same FQDN as the domain in the cookie
    }
    
    // context.session.userId = user.id;

    // context.session.cookie = {token, options}
    // console.log(res.cookie)

    // return { userId: user.id, token: token, tokenExpiration: 1}
    return { userId: user.id, token: token}
  }
}