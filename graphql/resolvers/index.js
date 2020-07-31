const userResolver = require('./user');
const videoResolver = require('./video');
const commentResolver = require('./comment');
const favouriteResolver = require('./favourite');

const rootResolver = {
  ...userResolver,
  ...videoResolver,
  ...commentResolver,
  ...favouriteResolver
} 

module.exports = rootResolver;