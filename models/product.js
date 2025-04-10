'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Store)
      Product.belongsTo(models.Category)
      Product.hasMany(models.CartProduct)
    }
    static async getProductsByCategories(Store, catId){
      try {
        return Product.findAll({
          include: Store,
          where: {
            CategoryId: catId
          }
        })
      } catch (error) {
        throw error
      }
    }
  }
  Product.init({
    name: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    description: DataTypes.STRING,
    StoreId: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};