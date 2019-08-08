const beerResolvers = require('./beer');
const userResolvers = require('./user');
const authResolvers = require('./auth');
const breweryResolvers = require('./brewery');

module.exports = {
  ...beerResolvers,
  ...userResolvers,
  ...authResolvers,
  ...breweryResolvers
};
