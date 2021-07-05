'use strict';


module.exports = {
  up: async (queryInterface,DataTypes) => {
    await queryInterface.createTable('Users', {
    
      user_id: {
        type:DataTypes.UUID,
        allowNull: false,
      defaultValue:DataTypes.UUIDV4,
        primaryKey: true
      },
      name: {
        type:DataTypes.STRING
      },
      email: {
        type:DataTypes.STRING,
        allowNull:false
      },
      password: {
        type:DataTypes.STRING,
        allowNull:false
      },
      device: {
        type:DataTypes.STRING
      },
      ip_address: {
        type:DataTypes.STRING
      },
      time: {
        type:DataTypes.STRING
      },
      otp: {
        type:DataTypes.STRING,
       
      },
      verified: {
        type:DataTypes.STRING
      },
      token: {
        type:DataTypes.STRING
      },
      appearance_order: {
        type:DataTypes.INTEGER
      },
      createdAt: {
        allowNull: false,
        type:DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type:DataTypes.DATE
      }
    });
  },
  down: async (queryInterface,DataTypes) => {
    await queryInterface.dropTable('Users');
  }
};