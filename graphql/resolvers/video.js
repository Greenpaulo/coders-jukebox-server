const User = require('../../models/User');
const Video = require('../../models/Video');

module.exports = {
  // Query all videos
  videos: async () => {
    try {
      const videos = await Video.find();
      return videos.map(video => {
        return { ...video._doc, _id: video.id };
      })
    } catch (err) {
      throw err
    }
  },

  //Create a video
  createVideo: async (args, req) => {
    // Check is user is authenticated
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    } 

    // console.log('args', args);

    // Create a new video object
    const video = new Video({
      title: args.videoInput.title,
      thumbnailURL: args.videoInput.thumbnailURL,
      videoURL: args.videoInput.videoURL,
      owner: req.userId // Mongoose will convert this to Object ID
    })

    // console.log(video)
    // let ownedVideo;

    // Save the video into the videos collection
    const res = await video.save();

    // ownedVideo = { ...res._doc, _id: video.id };

    try {
      // Find the user associated who choose the video
      const user = await User.findById(req.userId)
      if (!user) {
        throw new Error('User not found.');
      }
      // Push the new video onto their ownedVideos array
      user.ownedVideos.push(video); // We can pass the object and mongoose will pull out the id as defined in our User schema.
      await user.save();
      
      // Return the video object
      return video;
    }
    catch (err) {
      console.log(err);
      throw err;
    }
  },

  //Remove a video
  removeVideo: async (args, req) => {
    // Check is user is authenticated
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    } 

    // Remove the video from the user's ownedvideos array
    try {
      // Find the user associated who choose the video
      const user = await User.findById(req.userId)
      if (!user) {
        throw new Error('User not found.');
      }
      
      // Filter the video from their ownedVideos array
      const updatedVideos = user.ownedVideos.filter(video => video._id != args.id);
      
      user.ownedVideos = updatedVideos;
      
      await user.save();
      
      // Remove the video from the videos collection 
      await Video.deleteOne({ _id: args.id });

      // Return the updated user object
      return user;
    }
    catch (err) {
      console.log(err);
      throw err;
    }
  }

  
}