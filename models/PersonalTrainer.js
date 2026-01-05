const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const PersonalTrainer = sequelize.define(
    "PersonalTrainer",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      full_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      certifications: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      specialization: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      gym_name: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      session_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      phone_number: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: "personal_trainers",
      timestamps: true,
      hooks: {
        beforeCreate: async (trainer) => {
          if (trainer.password) {
            trainer.password = await bcrypt.hash(trainer.password, 10);
          }
        },
        beforeUpdate: async (trainer) => {
          if (trainer.changed("password")) {
            trainer.password = await bcrypt.hash(trainer.password, 10);
          }
        },
      },
    }
  );

  // Método para validar contraseña
  PersonalTrainer.prototype.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  return PersonalTrainer;
};
