const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autopopulate = require('mongoose-autopopulate');

const VideoSchema = new Schema({
  title: String,
  thumbnailURL: String,
  videoURL: String,
  
  // The user connected to the video
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    // autopopulate: true
  } 
});

// VideoSchema.plugin(autopopulate);

module.exports = mongoose.model('video', VideoSchema);