'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Store.belongsTo(models.User)
      Store.hasMany(models.Product)
    }
    get joinDate(){
      return this.createdAt.getFullYear()
    }
  }
  Store.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    description: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Store',
  });
  return Store;
};