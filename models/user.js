'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    user_id: {
      type:DataTypes.UUID,
      allowNull: false,
    defaultValue:DataTypes.UUIDV4,
      primaryKey: true
    },
    name: DataTypes.STRING,
    email: {
      type:DataTypes.STRING,
      allowNull:false
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false
    },
    device: DataTypes.STRING,
    ip_address: DataTypes.STRING,
    time: DataTypes.STRING,
    otp: DataTypes.STRING,
    verified: DataTypes.STRING,
    token: DataTypes.STRING,
    appearance_order: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};