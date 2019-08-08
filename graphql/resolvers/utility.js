const BeerModel = require('../../model/beer');
const UserModel = require('../../model/user');
const BreweryModel = require('../../model/brewery');

const Beers = async beerIds => {
  if (!beerIds) {
    return [];
  }
  let beers = await BeerModel.find({
    _id: { $in: beerIds }
  });
  
  return beers.map(beer => {
    return { ...beer._doc, _id: beer.id };
  });
};

const User = async userId => {
  let user = await UserModel.findById({
    _id: userId
  });
  if (!user) {
    throw new Error('cant find user');
  }
  return { ...user._doc, _id: user.id };
};

module.exports = {
  Beers,
  User  
}