'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { STRING, BOOLEAN} = Sequelize;

    return queryInterface.sequelize.transaction(async t => {
      try{
        await queryInterface.addColumn("books","choice",{
            type: BOOLEAN,
            defaultValue: true,
          },
          { transaction: t}
        );
        
        await queryInterface.addColumn("books","home_tag",{
            type: STRING(10),
            defaultValue: "无",
          },
          { transaction: t}
        );

        return Promise.resolve()
      }catch(e){
        return Promise.reject(e)
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async t => {
      try{
        await queryInterface.removeColumn("books","choice",
        { transaction: t});
        
        await queryInterface.removeColumn("books","home_tag",
        { transaction: t});
    
        return Promise.resolve()
      }catch(e){
        return Promise.reject(e)
      }
    })
  }
};
