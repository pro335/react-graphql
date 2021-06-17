const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const pick = require("lodash").pick;
var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
var UserModel = require('./User');

const SECRET = "createaverystrongsecretthatalsoincludes2423412wdsa324e34e";

var userType = new GraphQLObjectType({
    name: 'user',
    fields: function () {
      return {
        _id: {
          type: GraphQLString
        },
        email: {
          type: GraphQLString
        },
        password: {
          type: GraphQLString
        },
      }
    }
  });

  var queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
      return {
        login: {
          type: userType,
          args: {
            email: {
              name: 'email',
              type: GraphQLString
            },
            password: {
              name: 'password',
              type: GraphQLString
            }
          },
          resolve: async function (root, params) {
            // check if the user exists
            const user = await UserModel.findOne({ email: params.email }).exec()
            if (!user) {
              throw new Error("No user found");
            }
            // check if the password matches the hashed one we already have
            const isValid = await bcrypt.compare(params.password, user.password);
            if (!isValid) {
              throw new Error("Incorrect password ");
            }
            //   sign in the user
            // if the user exist then create a token for them
            const token = await jwt.sign(
              {
                user: pick(user, ["_id", "email"])
              },
              SECRET,
              // this token will last for a day, but you can change it
              // check the jsonwebtoken for more on this
              { expiresIn: "1d" }
            );
            return {token, password: null, ...user._doc}
          }
        }
      }
    }
  });

  var mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: function () {
      return {
        register: {
          type: userType,
          args: {
            email: {
              name: 'email',
              type: GraphQLString
            },
            password: {
              name: 'password',
              type: GraphQLString
            }
          },
          resolve: async function (root, params) {
            let user = new UserModel();
            user.email = params.email;
            user.password = await bcrypt.hash(params.password, 12); // encrypt the password before saving it
            user.save();
          }
        },
        login: {
          type: userType,
          args: {
            email: {
              name: 'email',
              type: GraphQLString
            },
            password: {
              name: 'password',
              type: GraphQLString
            }
          },
          resolve: async function (root, params) {
            // check if the user exists
            const user = await UserModel.findOne({ email: params.email }).exec()
            if (!user) {
              throw new Error("No user found");
            }
            // check if the password matches the hashed one we already have
            const isValid = await bcrypt.compare(params.password, user.password);
            if (!isValid) {
              throw new Error("Incorrect password ");
            }
            //   sign in the user
            // if the user exist then create a token for them
            const token = await jwt.sign(
              {
                user: pick(user, ["_id", "email"])
              },
              SECRET,
              // this token will last for a day, but you can change it
              // check the jsonwebtoken for more on this
              { expiresIn: "1d" }
            );
            return {token, password: null, ...user._doc}
          }
        }
      }
    }
  });

  module.exports = new GraphQLSchema({query: queryType, mutation: mutation});