'use strict';

const Service = require('egg').Service;

class AuthorizeService extends Service {
  async usernameAuthorize(username,password) {
    const result = await this.ctx.model.Register.findOne({
        where:{
            username: username
        },
        attribute:['password', 'phonenumber']
    }); 

    let userExist = false;
    let passwordValid = false;
    let phonenumber = "";
    if(result && result.password){
      userExist = true;
      passwordValid = await this.ctx.compare(password, result.password)
      phonenumber = result.phonenumber
    }
    
    return {
      userExist: userExist,
      passwordValid: passwordValid,
      phonenumber: phonenumber
    }
  }

  async phonenumberAuthorize(phonenumber,password) {
    const result = await this.ctx.model.Register.findOne({
        where:{
          phonenumber: phonenumber
        },
        attribute:['password', 'username']
    }); 

    let userExist = false;
    let passwordValid = false;
    let username = "";
    if(result && result.password){
      userExist = true;
      passwordValid = await this.ctx.compare(password, result.password)
      username = result.username
    }
    
    return {
      userExist: userExist,
      passwordValid: passwordValid,
      username: username
    }
  }
}

module.exports = AuthorizeService;
