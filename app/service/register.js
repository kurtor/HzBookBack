'use strict';

const Service = require('egg').Service;

class LoginService extends Service {
    async checkInRegister(keyword,value) {
        let findWhere = {}
        switch(keyword){
            case 'username': 
                findWhere = { username: value}
                break;
            case 'phonenumber':
                findWhere = { phonenumber: value}
                break;
            default:
                break;
        }

        const result = await this.ctx.model.Register.findOne({
            where: findWhere
        })
        const valid = result ? false : true;
        return valid;
    }

    async beginRegister(username,phonenumber,password){
        try{
            const hash_password = await this.ctx.genHash(password)
            const result = await this.app.model.transaction(async t =>{
                let register  = await this.ctx.model.Register.create({
                    username: username,
                    phonenumber: phonenumber,
                    password: hash_password,
                    createAt: new Date(),
                    updateAt: new Date(),
                }, { transaction: t })
                return register;
            });
        }catch(err){
            return err;
        }
        return "success"
    }
}

module.exports = LoginService;
