module.exports = app =>{
    const {STRING, INTEGER, DATE, NOW} = app.Sequelize

    const BookVersion = app.model.define('book_version',{
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
        },
    },{
        timestamps: false,
        freezeTableName: true,
        tableName: 'book_versions',
        underscored: true,
    });

    BookVersion.associate = ()=>{
        app.model.BookVersion.hasMany(app.model.BookInventory,{
            foreignKey: 'book_version_id',
            as:"bookInventories"
        }),
        app.model.BookVersion.belongsTo(app.model.Book,{
            as: 'book'
        })
    }

    return BookVersion;
}