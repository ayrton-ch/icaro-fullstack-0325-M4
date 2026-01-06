"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn("personal_trainers", "full_name", "name");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn("personal_trainers", "name", "full_name");
  },
};
