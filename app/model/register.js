module.exports = app => {
    const { STRING, INTEGER, DATE, NOW } = app.Sequelize;

    const Register = app.model.define('register',{
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
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'registers',
        underscored: true,
    })

    return Register;
}