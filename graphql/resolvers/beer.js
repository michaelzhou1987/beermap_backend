const BeerModel = require('../../model/beer');
const UserModel = require('../../model/user');
const BreweryModel = require('../../model/brewery');
const { Beers, User } = require('./utility');

module.exports = {
  beers: args => {
    return BeerModel.find({});
  },
  beer: async args => {
    let beerQuery = await BeerModel.findById({
      _id: args._id
    });
    console.log('trying beer resolver')
    console.log(beerQuery)

    let beer = { ...beerQuery._doc, _id: beerQuery.id };

    let user = await User(beer.user);

    // beer.user = user;

    return { ...beer, user: user };
  },
  createBeer: async (args, req) => {
    try {
      console.log('trying mutation ---> createBeer');
      if(!req.isAuth) {
        throw new Error('Unauthorized')
      }
      const { beerInput } = args;

      let currentUser = req.userInfo.userId;

      let user = await User(currentUser);

      let beerList = await Beers(user.beers);

      let flag = await beerList.some(element => {
        return element.name === beerInput.name;
      });

      if (flag) {
        throw new Error('Beer with same name already exists.');
      }

      let beer = await BeerModel.create({
        name: beerInput.name,
        breweryId: beerInput.brewery || '',
        breweryName: beerInput.breweryName,
        type: beerInput.type,
        region: beerInput.region,
        date: beerInput.date,
        rate: beerInput.rate || 0,
        price: beerInput.price,
        recommand: beerInput.recommand,
        description: beerInput.description,
        keyNotes: beerInput.keyNotes,
        location: beerInput.location,
        thumbnail: beerInput.thumbnail || 'default thumbnail',
        user: currentUser,
        latitude: beerInput.latitude,
        longtitude: beerInput.longtitude,
        city: beerInput.city,
        state: beerInput.state,
        country: beerInput.country
      });

      if (beer.breweryId) {
        let brewery = await BreweryModel.findById({
          _id: beer.breweryId
        });


        if (brewery.beers.length > 0) {
          brewery.beers.push(beer._id);
        } else {
          brewery.beers = [beer._id];
        }
        brewery.save()
      }

      let updateUser = await UserModel.findById({
        _id: beer.user
      });

      if (!updateUser.beers) {
        updateUser.beers = [beer._id];
      } else {
        updateUser.beers.push(beer._id);
      }

      await updateUser.save();

      return {
        ...beer._doc,
        _id: beer.id,
        user: { ...updateUser._doc, _id: updateUser.id }
      };
    } catch (error) {
      console.log(error);
    }
  }
};
