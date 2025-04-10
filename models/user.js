"use strict";
const { Model, Op } = require("sequelize");
var bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile);
      User.hasOne(models.Store);
    }
    static async register(input) {
      try {
        await User.create(input);
        return;
      } catch (error) {
        throw error
      }
    }







    static async getUsersNoAdmin() {
      try {
        return User.findAll({ where: { role: { [Op.ne]: "admin" } } });
      } catch (error) {
        throw error;
      }
    }
    get accountCreated() {
      return this.createdAt.toLocaleDateString();
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate(instance =>{
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(instance.password, salt)
    
    instance.password = hash
  })

  User.afterCreate(async (instance, options) => {
    const { Profile, Cart } = instance.sequelize.models;
  
    await Profile.create({
      firstName: '',
      lastName: '',
      address: '',
      phoneNumber: '',
      UserId: instance.id
    });
    await Cart.create({
      UserId: instance.id
    })
  });
  

  // User.beforeCreate(instance=>{
  //   instance.Profile.create({
  //     firstName: "",
  //     lastName: "",
  //     address: "",
  //     phoneNumber: ""
  //   })
  // })
  return User;
};
