module.exports = app => {
  const { STRING, INTEGER, BOOLEAN, DATE, NOW } = app.Sequelize;

  const Book = app.model.define('book',{
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
    choice: {
      type: BOOLEAN,
      defaultValue: true,
    },
    home_tag:{
      type: STRING(10),
      defaultValue: "无",
    },
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
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'books',
    underscored: true,
  });

  Book.associate = ()=>{
    app.model.Book.hasMany(app.model.BookVersion,{
        foreignKey: 'book_id',
        as:"bookVersions"
    })
  }

  return Book;
}