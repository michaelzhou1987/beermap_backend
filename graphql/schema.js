// const graphql = require('graphql');

// const {
//   GraphQLObjectType,
//   GraphQLID,
//   GraphQLString,
//   GraphQLInt,
//   GraphQLList,
//   GraphQLSchema,
//   GraphQLInputObjectType,
//   GraphQLNonNull,
//   GraphQLError
// } = graphql;

// // const GeolocationType = require('./type/geolocation.type');

// const BeerType = require('./schema/type/beer.type');
// const BeerModel = require('../model/beer');

// const UserType = require('./schema/type/user.type');
// const UserModel = require('../model/user');

// const BreweryType = require('./schema/type/brewery.type');
// const BreweryModel = require('../model/brewery');

// const AuthType = require('./schema/type/auth.type');

// const md5 = require('md5');


// const RootQuery = new GraphQLObjectType({
//   name: 'RootQueryType',
//   fields: {
//     beers: {
//       type: new GraphQLList(BeerType),
//       resolve(parent, args) {
//         return BeerModel.find({});
//       }
//     },
//     beer: {
//       type: BeerType,
//       args: { _id: { type: GraphQLID } },
//       resolve(parent, args) {
//         return BeerModel.findById({ _id: args._id });
//       }
//     },
//     users: {
//       type: new GraphQLList(UserType),
//       resolve(parent, args) {
//         return UserModel.find({});
//       }
//     },
//     user: {
//       type: UserType,
//       args: { _id: { type: GraphQLID } },
//       resolve(parent, args) {
//         return UserModel.findById({ _id: args._id });
//       }
//     },
//     login: {
//       type: AuthType,
//       args: {
//         email: { type: new GraphQLNonNull(GraphQLString) },
//         pwd: { type: new GraphQLNonNull(GraphQLString) }
//       },
//       async resolve(parent, args) {
//         let queryResult = await UserModel.find({ email: args.email, pwd: md5(args.pwd) });
        
//       }
//     },
//     brewerys: {
//       type: new GraphQLList(BreweryType),
//       resolve(parent, args) {
//         return BreweryModel.find({});
//       }
//     },
//     brewery: {
//       type: BreweryType,
//       args: { _id: { type: GraphQLID } },
//       resolve(parent, args) {
//         return BreweryModel.findById({ _id: args._id });
//       }
//     }
//   }
// });

// const Mutation = new GraphQLObjectType({
//   name: 'Mutation',
//   fields: {
//     addBeer: {
//       type: BeerType,
//       args: {
//         name: { type: new GraphQLNonNull(GraphQLString) },
//         breweryId: { type: GraphQLID },
//         breweryName: { type: new GraphQLNonNull(GraphQLString) },
//         type: { type: GraphQLString },
//         region: { type: GraphQLString },
//         date: { type: GraphQLInt },
//         rate: { type: GraphQLInt },
//         price: { type: GraphQLString },
//         recommand: { type: GraphQLString },
//         description: { type: GraphQLString },
//         keyNotes: { type: GraphQLString },
//         location: { type: GraphQLString },
//         thumbnail: { type: GraphQLString },
//         geolocation: {
//           type: new GraphQLInputObjectType({
//             name: 'GeolocationInput',
//             fields: () => {
//               return {
//                 latitude: { type: GraphQLString },
//                 longitude: { type: GraphQLString },
//                 city: { type: GraphQLString },
//                 state: { type: GraphQLString },
//                 country: { type: GraphQLString }
//               };
//             }
//           })
//         },
//         userId: { type: GraphQLID }
//       },
//       resolve(parent, args) {
//         return BeerModel.create({
//           name: args.name,
//           breweryId: args.breweryId || '',
//           breweryName: args.breweryName,
//           type: args.type || '',
//           region: args.region || '',
//           date: args.date || 0,
//           rate: args.rate || 0,
//           price: args.price || '',
//           recommand: args.recommand || '',
//           description: args.description || '',
//           keyNotes: args.keyNotes || '',
//           location: args.location || '',
//           thumbnail: args.thumbnail || '',
//           geolocation: args.geolocation,
//           userId: args.userId
//         });
//       }
//     },
//     createUser: {
//       type: UserType,
//       args: {
//         email: { type: new GraphQLNonNull(GraphQLString) },
//         pwd: { type: new GraphQLNonNull(GraphQLString) },
//         confirmPwd: { type: new GraphQLNonNull(GraphQLString) },
//         nickname: { type: new GraphQLNonNull(GraphQLString) },
//         firstName: { type: GraphQLString },
//         lastName: { type: GraphQLString },
//         phoneNumber: { type: GraphQLString }
//       },
//       async resolve(parent, args) {
//         try {
//           console.log('trying mutation');
//           let userResult = await UserModel.find({
//             email: args.email
//           })
//           if (userResult.length > 0) {
//             throw new GraphQLError(
//               'User with same email already exists'
//             );
//           } else if (args.pwd !== args.confirmPwd) {
//             throw new GraphQLError('Passwords does not match');
//           }
          
//           return UserModel.create({
//             email: args.email,
//             pwd: md5(args.pwd),
//             nickname: args.nickname,
//             firstName: args.firstName || '',
//             lastName: args.lastName || '',
//             phoneNumber: args.phoneNumber || '',
//             avatar: 'default avatar',
//             role: 'test user'
//           })
//           } catch (error) {
//             console.log(error)
//           }
//       }
//     }
//   }
// });

// module.exports = new GraphQLSchema({
//   query: RootQuery,
//   mutation: Mutation
// });
