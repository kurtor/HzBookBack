'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { STRING, INTEGER, DATE, NOW} = Sequelize;

    await queryInterface.createTable("registers", {
      id:{
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username:STRING(32),
      phonenumber:STRING(11),
      password:STRING(64),
      createAt: {
          type: DATE,
          field: 'register_create_time',
          allowNull: false,
          defaultValue: NOW,
      },
      updateAt: {
          type: DATE,
          field: 'register_update_time',
          allowNull: false,
          defaultValue: NOW,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('registers');
  }
};
