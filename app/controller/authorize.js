'use strict';
const jwt = require('jsonwebtoken')

const Controller = require('egg').Controller;

class AuthorizeController extends Controller {
  async login() {
    const {username = null, phonenumber= null , password} = this.ctx.request.body;

    if(username){
        const authorize = await this.service.authorize.usernameAuthorize(username,password)
        if(authorize.passwordValid){
            //密码校验成功
            try{
                let token = await new Promise((resolve,reject)=>{
                    //注册后签发token，有效期3天
                    jwt.sign(
                        {username:username,
                            phonenumber:authorize.phonenumber},
                        this.ctx.app.config.passportJwt.secret,
                        {expiresIn: 3600*72},
                        (err, token)=>{
                            if(err){
                                reject()
                            }
                            resolve(token)
                        }
                    )
                })
                this.ctx.state = 200;
                this.ctx.body = JSON.stringify({
                    token: token,
                    userInfo: {
                        username:username,
                        phonenumber:authorize.phonenumber
                    },
                    success: true, 
                    message: '登录成功'
                })
            }catch(err){
                console.log(err)
                this.ctx.state = 503
                this.ctx.body = { success: false, message: '无法生成token' };
            }
        }else{
            if(authorize.userExist){
                this.ctx.state = 401
                this.ctx.body = { success: false, message: '用户名和密码不匹配' };
            }else{
                this.ctx.state = 401
                this.ctx.body = { success: false, message: '用户名不存在' };
            }
        }
    }

    if(phonenumber){
        const authorize = await this.service.authorize.phonenumberAuthorize(phonenumber,password)
        if(authorize.passwordValid){
            //密码校验成功
            try{
                let token = await new Promise((resolve,reject)=>{
                    //注册后签发token，有效期3天
                    jwt.sign(
                        {username:authorize.username,
                            phonenumber:phonenumber},
                        this.ctx.app.config.passportJwt.secret,
                        {expiresIn: 3600*72},
                        (err, token)=>{
                            if(err){
                                reject()
                            }
                            resolve(token)
                        }
                    )
                })
                this.ctx.state = 200;
                this.ctx.body = JSON.stringify({
                    token: token,
                    userInfo: {
                        username:authorize.username,
                        phonenumber:phonenumber
                    },
                    success: true, 
                    message: '登录成功'
                })
            }catch(err){
                console.log(err)
                this.ctx.state = 503
                this.ctx.body = { success: false, message: '无法生成token' };
            }
        }else{
            if(authorize.userExist){
                this.ctx.state = 401
                this.ctx.body = { success: false, message: '手机号和密码不匹配' };
            }else{
                this.ctx.state = 401
                this.ctx.body = { success: false, message: '手机号不存在' };
            }
        }
    }
  }
}

module.exports = AuthorizeController;
