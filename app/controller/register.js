'use strict';

const Controller = require('egg').Controller;

class RegisterController extends Controller {
  async valid() {
    this.ctx.body = {
      userNameValid: await this.service.register.checkInRegister('username',this.ctx.query.username),
      phonenumberValid: await this.service.register.checkInRegister('phonenumber',this.ctx.query.phonenumber),
    };
  }

  async process() {
    const {username,phonenumber,password} = this.ctx.request.body;
    
    this.ctx.body = {
      message: await this.service.register.beginRegister(username,phonenumber,password)
    }
  }
}

module.exports = RegisterController;
