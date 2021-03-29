'use strict';

const Service = require('egg').Service;

class BookService extends Service {

    async getAllBook(){
        const result = await this.ctx.model.Book.findAll({
            attributes:['id','title','author','main_img', 'content']
        });
        return result;
    }

    async getOneBookById(id){
        const result = await this.ctx.model.Book.findOne({
            where:{
                id: id
            },
            include:[
                {
                    model:this.ctx.model.BookVersion, 
                    as:"bookVersions",
                    include:[
                        {
                            model:this.ctx.model.BookInventory,
                            as:"bookInventories",
                        }
                    ]
                }
            ]
        });
        return result;
    }
    async getSomeBookByTitle(title){
        let Op = this.app.Sequelize.Op;
        const result = await this.ctx.model.Book.findAll({
            where:{
                title:{
                    [Op.like]: `%${title}%`
                }
            }
        });
        return result;
    }

    async getRelativeBookByTitle(title){
        let Op = this.app.Sequelize.Op;
        const result = await this.ctx.model.Book.findAll({
            where:{
                title:{
                    [Op.like]: `%${title}%`
                }
            },
            attributes:['id','title']
        });
        return result;
    }

    async getSomeBookByIds(idArray){
        const results = await this.ctx.model.Book.findAll(
            {
                where:{
                    id: idArray
                }
            }
        );
        return results;
    }

    async getSomeBookByHomeTag(homeTag){
        const results = await this.ctx.model.Book.findAll(
            {
                where:{
                    home_tag: homeTag
                }
            }
        );

        return results;
    }

    async getSomeBookByClassification(classification){
        const results = await this.ctx.model.Book.findAll(
            {
                where:{
                    classification: classification
                }
            }
        );
        return results;
    }

    async getListByColName(colName){
        const results = await this.ctx.model.Book.findAll(
            {
                attributes:[colName],
                group:colName
            }
        )
        let list = []
        results.forEach((value)=>{
            list.push(value.classification)
        })
        return list;
    }

    async getPageContent(keyword,currentPage,pageSize){
        let findWhere = {}
        let findOrder = []
        switch(keyword){
            case 'all': 
                break;
            case 'new':
                findOrder = [['id', 'DESC']]
                break;
            case 'choice':
                findWhere = { choice: true}
                break;
            default:
                findWhere = {classification: keyword}
                break;
        }

        const totalSize = await this.ctx.model.Book.count({
            where: findWhere
        })
            
        const pageContent = await this.ctx.model.Book.findAll(
            {
                where: findWhere,
                limit: parseInt(pageSize),
                offset: (parseInt(currentPage)-1)* parseInt(pageSize),
                order: findOrder
            }
        )
        const result = {
            totalSize: totalSize,
            pageContent: pageContent
        };

        return result;
    }

    async initBookFromLocalJson(){
        const fs = require('fs')
        const book_list_file_path = './bookList_20210313_200405.json'
        const book_list = fs.readFileSync(book_list_file_path, 'utf8');
        const book_list_json = JSON.parse(book_list);
        
        for(let book_item of book_list_json){
            try{
                const result = await this.app.model.transaction(async t =>{
                    let book  = await this.ctx.model.Book.create({
                        title: book_item["title"],
                        author: book_item["author"],
                        main_img: book_item["main_img"],
                        content:book_item["content"],
                        classification: book_item["classification"],
                        choice: book_item["choice"],
                        home_tag: book_item["home_tag"],
                        createAt: new Date(),
                        updateAt: new Date(),
                    }, { transaction: t })
                    
                    if(book_item["borrow_info"].length != 0){
                        for(let borrow_info of book_item["borrow_info"]){        
                            let bookVersion = await this.ctx.model.BookVersion.create({
                                real_title: borrow_info["real_version"]['title'],
                                real_author: borrow_info["real_version"]['author'],
                                price: borrow_info["real_version"]['price'],
                                page_count: borrow_info["real_version"]['page_count'],
                                publisher: borrow_info["real_version"]['publisher'],
                                content: borrow_info["real_version"]['content'],
                                origin_title: borrow_info["real_version"]['origin_title'],
                                version_img: borrow_info["real_version"]['version_img'],
                                hz_lib_code: borrow_info["real_version"]['hz_lib_code'],
                                createAt: new Date(),
                                updateAt: new Date(),
                            }, { transaction: t })
                            
                            if(borrow_info["inventory"].length != 0){
                                for(let inventory of borrow_info["inventory"]){
                                    let bookInventory = await this.ctx.model.BookInventory.create({
                                        call_number : inventory["call_number"],
                                        status : inventory["status"],
                                        lib_name : inventory["lib_name"],
                                        lib_room : inventory["lib_room"],
                                        createAt: new Date(),
                                        updateAt: new Date(),
                                    }, { transaction: t })
                                    await bookVersion.addBookInventories(bookInventory, { transaction: t })
                                }
                            }
                            await book.addBookVersions(bookVersion, { transaction: t })
                        } 
                    }
                    return book;
                });
            }catch(err){
                return err;
            }
        }
        return "success"
    }
}

module.exports = BookService;

