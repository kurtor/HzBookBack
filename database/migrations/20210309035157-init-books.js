'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      const { STRING, INTEGER, DATE, NOW} = Sequelize;

      await queryInterface.createTable("books", {
        id:{
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        title: STRING(100),
        author: STRING(100),
        main_img: STRING(100),
        content:STRING(800),
        classification: STRING(10),
        createAt: {
          type: DATE,
          field: 'book_create_time',
          allowNull: false,
          defaultValue: NOW,
        },
        updateAt: {
          type: DATE,
          field: 'book_update_time',
          allowNull: false,
          defaultValue: NOW,
        }
      });

      await queryInterface.createTable("book_versions", {
        id:{
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        book_id: INTEGER,
        real_title: STRING(100),
        real_author: STRING(100),
        price: STRING(20),
        page_count: STRING(20),
        publisher: STRING(50),
        content:STRING(800),
        origin_title: STRING(50),
        version_img: STRING(100),
        hz_lib_code: STRING(20),
        createAt: {
            type: DATE,
            field: 'book_create_time',
            allowNull: false,
            defaultValue: NOW,
        },
        updateAt: {
            type: DATE,
            field: 'book_update_time',
            allowNull: false,
            defaultValue: NOW,
        }
      });

      await queryInterface.createTable("book_inventories", {
        id:{
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        book_version_id: INTEGER,
        call_number: STRING(100),
        status: STRING(20),
        lib_name: STRING(20),
        lib_room: STRING(20),
        createAt: {
            type: DATE,
            field: 'book_create_time',
            allowNull: false,
            defaultValue: NOW,
        },
        updateAt: {
            type: DATE,
            field: 'book_update_time',
            allowNull: false,
            defaultValue: NOW,
        },
      });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

     await queryInterface.dropTable('books');
     await queryInterface.dropTable('book_versions');
     await queryInterface.dropTable('book_inventories');
  }
};
