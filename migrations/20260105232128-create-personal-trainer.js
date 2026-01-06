"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("personal_trainers", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },

      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },

      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },

      certifications: {
        type: Sequelize.TEXT,
      },

      specialization: {
        type: Sequelize.STRING(100),
      },

      gym_name: {
        type: Sequelize.STRING(100),
      },

      session_price: {
        type: Sequelize.DECIMAL(10, 2),
      },

      phone_number: {
        type: Sequelize.STRING(20),
      },

      available: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("personal_trainers");
  },
};
