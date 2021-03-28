module.exports = app =>{
    const {STRING, INTEGER, DATE, NOW} = app.Sequelize

    const BookInventory = app.model.define('book_inventory',{
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
    },{
        timestamps: false,
        freezeTableName: true,
        tableName: 'book_inventories',
        underscored: true,
    });

    BookInventory.associate = () => {
        app.model.BookInventory.belongsTo(app.model.BookVersion,{
            as: 'bookVersion'
        })
    }

    return BookInventory;
}
