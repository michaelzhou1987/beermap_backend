const UserModel = require('../../model/user');
const BeerModel = require('../../model/beer');
const BreweryModel = require('../../model/brewery');
const { Beers, User } = require('./utility');

const jwt = require('jsonwebtoken');

const md5 = require('md5');

module.exports = {
  login: async ({ email, pwd, rememberMe }) => {
    try {
      let token = null;
      let user = await UserModel.findOne({
        email: email,
        pwd: md5(pwd)
      });

      if (!user) {
        throw new Error('Username and password does not match');
      }

      if (rememberMe) {
        token = jwt.sign(
          {
            userId: user.id,
            email: user.email,
            role: user.role,
            nickname: user.nickname
          },
          'randomsecretkey'
        );
      } else {
        token = jwt.sign(
          {
            userId: user.id,
            email: user.email,
            role: user.role,
            nickname: user.nickname
          },
          'randomsecretkey',
          {
            expiresIn: '1h'
          }
        );
      }

      return {
        nickname: user.nickname,
        userId: user.id,
        token: token,
        role: user.role
      };
    } catch (error) {
      console.log(error);
    }
  },
  checkAuth: (args, req) => {
    if(!req.isAuth) {
      throw new Error('not authorized')
    }
    return req.userInfo
  }
};
