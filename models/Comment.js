const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autopopulate = require('mongoose-autopopulate');

const CommentSchema = new Schema(
  {
    content: {
      type: String,
      required: true
    },
    commenter: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      // autopopulate: true
    },
    playlistOwner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      // autopopulate: true
    }
  },
{timestamps: true}
);

// CommentSchema.plugin(autopopulate);

module.exports = mongoose.model('comment', CommentSchema);