'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let profile = require('../data/profiles.json').map(el=>{
      el.createdAt = el.updatedAt = new Date()
      return el
     })
     await queryInterface.bulkInsert('Profiles', profile, {})

     let user = require('../data/users.json').map(el=>{
      el.createdAt = el.updatedAt = new Date()
      return el
     })
     await queryInterface.bulkInsert('Users', user, {})

     let store = require('../data/stores.json').map(el=>{
      el.createdAt = el.updatedAt = new Date()
      return el
     })
     await queryInterface.bulkInsert('Stores', store, {})

     let category = require('../data/categories.json').map(el=>{
      el.createdAt = el.updatedAt = new Date()
      return el
     })
     await queryInterface.bulkInsert('Categories', category, {})

     let product = require('../data/products.json').map(el=>{
      el.createdAt = el.updatedAt = new Date()
      return el
     })
     await queryInterface.bulkInsert('Products', product, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Profiles', null, {})
    await queryInterface.bulkDelete('Users', null, {})
    await queryInterface.bulkDelete('Stores', null, {})
    await queryInterface.bulkDelete('Categories', null, {})
    await queryInterface.bulkDelete('Products', null, {})
  }
};
