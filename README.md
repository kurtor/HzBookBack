# HzBookBack【eggjs+sequelize+mysql】

简单能用的后端api接口，搭配前端【HzBookInfo】



## 技术栈

框架：eggjs

数据库：mysql

ORM：egg-sequelize，mysql2，sequelize-cli

鉴权：egg-passport，egg-passport-jwt，jsonwebtoken，bcrypt



## 基本功能

路由

/api/book  获取所有图书

/api/book/search  模糊搜索

/api/book/getPageContent/:keyWord/:currentPage/:pageSize  分页接口

/api/register  POST 注册接口

/api/login  POST 登录接口

/api/token/refresh  更新token



### 启动

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/api/book
```



### 部署

```bash
$ npm start
$ npm stop
```

### 

