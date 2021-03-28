'use strict';
const jwt = require('jsonwebtoken')

const Controller = require('egg').Controller;

class TokenController extends Controller {
  async refresh() {
    const username = this.ctx.payload.username;
    const phonenumber = this.ctx.payload.phonenumber;
    const now = new Date()
    const timestamp = parseInt(now.getTime()/1000)
    if(timestamp - this.ctx.payload.iat >= 3600*20){
      try{
       //token已满20小时，签发新的返回，有效期3天
        let token = await new Promise((resolve,reject)=>{
            jwt.sign(
                {username:username,
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
                username:username,
                phonenumber:phonenumber
            },
            success: true, 
            message: '更新token成功'
        })
      }catch(err){
          this.ctx.state = 503
          this.ctx.body = { success: false, message: '无法生成token' };
      }
    }else{
      this.ctx.state = 200;
      this.ctx.body = JSON.stringify({
          userInfo: {
              username:username,
              phonenumber:phonenumber
          },
          success: true, 
          message: '无需更新token'
      })
    }
  }
}

module.exports = TokenController;
