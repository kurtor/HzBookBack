'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  ejs: {
		enable:true,
		package:'egg-view-ejs'
	},
  mysql: {
    enable: true,
    package: 'egg-mysql'
  },

  sequelize: {
    enable: true,
    package: 'egg-sequelize'
  },
  cors: {
		enable:true,
		package:'egg-cors'
	},
  passport : {
    enable: true,
    package: 'egg-passport',
  },
  passportJwt:{
    enable: true,
    package: 'egg-passport-jwt',
  },
  bcrypt : {
    enable: true,
    package: 'egg-bcrypt',
  }
  
};
