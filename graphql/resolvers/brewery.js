const BeerModel = require('../../model/beer');
const UserModel = require('../../model/user');
const BreweryModel = require('../../model/brewery');
const { Beers, User } = require('./utility');

module.exports = {
  brewerys: async () => {
    try {
      let queryResult = await BreweryModel.find({})
      console.log(queryResult)
      return queryResult.map(brewery=>{
        return {
          ...brewery._doc,
          _id: brewery.id
        };
      })
    } catch (error) {
      console.log(error)
    }
  },
  createBrewery: async (args)=> {
    try {
      const { breweryInput } = args;
      console.log(args)
      
      let queryResult = await BreweryModel.findOne({
        name: breweryInput.name
      });
      
      if(queryResult) {
        throw Error('Brewery with same name already exists...')
      }

      let newBrewery = await BreweryModel.create({
        name: breweryInput.name,
        city: breweryInput.city,
        state: breweryInput.state,
        country: breweryInput.country
      });

      return {
        ...newBrewery._doc,
        _id: newBrewery.id
      };
    } catch (error) {
      console.log(error)
    }
  }
};
