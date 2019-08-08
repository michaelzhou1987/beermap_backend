const UserModel = require('../../model/user');
const BeerModel = require('../../model/beer');
const BreweryModel = require('../../model/brewery');
const { Beers, User } = require('./utility');

const md5 = require('md5');

module.exports = {
  users: args => {
    try {
      return UserModel.find({}).then(users => {
        return users.map(user => {
          return { ...user._doc, _id: user.id };
        });
      });
    } catch (error) {
      console.log(error)
    }
  },
  user: async args => {
    try {
      let userQuery = await UserModel.findById({
        _id: args._id
      });

      let user = { ...userQuery._doc, _id: userQuery.id };

      let beers = await Beers(user.beers);

      return { ...user, beers: beers };
    } catch (error) {
      console.log(error);
    }
  },
  createUser: async args => {
    try {
      console.log('trying mutation ---> createUser');
      const { userInput } = args;
      let userResult = await UserModel.find({
        email: userInput.email
      });
      if (userResult.length > 0) {
        throw new Error('User with same email already exists');
      } else if (userInput.pwd !== userInput.confirmPwd) {
        throw new Error('Passwords does not match');
      } else if (!userInput.agreement) {
        throw new Error('Need to agree to the agreement');
      }
      let user = await UserModel.create({
        email: userInput.email,
        pwd: md5(userInput.pwd),
        nickname: userInput.nickname,
        firstName: userInput.firstName || '',
        lastName: userInput.lastName || '',
        prefix: userInput.prefix || '',
        phoneNumber: userInput.phoneNumber || '',
        avatar: 'default avatar',
        role: 'test user'
      });

      return { ...user._doc, pwd: null, _id: user.id };
    } catch (error) {
      console.log(error);
    }
  }
};
