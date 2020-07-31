const User = require('../../models/User');

module.exports = {

  //Create a video
  addFavourite: async (args, req) => {
    // Check is user is authenticated
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {
      // Find the user
      const user = await User.findById(req.userId)
      if (!user) {
        throw new Error('User not found.');
      }
      // Check is the id is already a favourite
      if (user.favourites.includes(args.id)) {
        throw new Error('This user is already a favourite!')
      }
      // Push the new favourite user id onto their favourites array
      user.favourites.push(args.id); // We can pass the object and mongoose will pull out the id as defined in our User schema.
      await user.save();

      // Return the updated user object
      return user;
    }
    catch (err) {
      console.log(err);
      throw err;
    }
  },

  //Remove a favourite
  removeFavourite: async (args, req) => {
    // Check is user is authenticated
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    // Remove the id from the user's favourite array
    try {
      // Find the logged in user
      const user = await User.findById(req.userId)
      if (!user) {
        throw new Error('User not found.');
      }

      // Filter the id from their favourites array
      const updatedFavourites = user.favourites.filter(fav => fav._id != args.id);

      user.favourites = updatedFavourites;

      await user.save();

      // Return the updated user object
      return user;
    }
    catch (err) {
      console.log(err);
      throw err;
    }
  }


}