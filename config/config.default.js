/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1615207709875_2493';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.view = {
    mapping:{
      '.html':'ejs'
    },
  };

  config.sequelize = {
    dialect: "mysql",
    host: "127.0.0.1",
    port: "3306",
    user: "root",
    password: "123456",
    database: "book_list",
    baseDir: "model",
    underscored: true,
    timezone: '+08:00'
  };

  config.security = {
    csrf:{
      enable: false,
      ignoreJSON: true
    },
    domainWhiteList:['http://localhost:8080','http://192.168.1.17:8000/']
  };
  
  config.cors = {
    origin: '*',
    allowMethod: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };

  config.passportJwt = {
    secret: 'wouiyigeffuwjd666ffuwbfl;q;',
  };

  config.bcrypt = {
    saltRounds: 10 // default 10
  };

  return {
    ...config,
    ...userConfig,
  };
};
