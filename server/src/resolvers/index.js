const { Query } = require('./Query');
const { Subscription } = require('./Subscription');
const { auth } = require('./Mutation/auth');
const { comment } = require('./Mutation/comment');
const { profile } = require('./Mutation/profile');
const { AuthPayload } = require('./AuthPayload');

module.exports = {
  Query,
  Mutation: {
    ...auth,
    ...comment,
    ...profile
  },
  Subscription,
  AuthPayload
};
