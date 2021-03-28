'use strict';

const Controller = require('egg').Controller;

class BookController extends Controller {
  async index(){
    const allBook = await this.service.book.getAllBook();
    this.ctx.body = allBook;
  };

  async search(){
    if(this.ctx.query.id){
      const oneBook = await this.service.book.getOneBookById(this.ctx.query.id);
      this.ctx.body = oneBook;
    }
    else if(this.ctx.query.title){
      const oneBook = await this.service.book.getSomeBookByTitle(this.ctx.query.title);
      this.ctx.body = oneBook;
    }
  };

  async simpleSearch(){
      const oneBook = await this.service.book.getRelativeBookByTitle(this.ctx.query.title);
      this.ctx.body = oneBook;
  };

  async getClassification(){
    const classificationArray= await this.service.book.getListByColName('classification')
    let current = this.ctx.query.classification == 'default' ? classificationArray[0] : this.ctx.query.classification

    this.ctx.body = {
      current:current,
      classificationArray: classificationArray,
    };
  }

  async getRecommend(){
    console.log("-------------------------------------")
    let recommendContent = {}
    for(let homeTag of this.ctx.queries.homeTag){
      console.log(homeTag)
      const someBook = await this.service.book.getSomeBookByHomeTag(homeTag);
      recommendContent[homeTag] = someBook
    }
    this.ctx.body = recommendContent;
    
  }

  async getPageContent(){
    this.ctx.body  = await this.service.book.getPageContent(this.ctx.params.keyWord,this.ctx.params.currentPage,this.ctx.params.pageSize);
  
  }

  async getFavorite(){
    const oneBook = await this.service.book.getSomeBookByIds(this.ctx.request.body.favoriteIdArray);
    this.ctx.body = oneBook;
  }

  async initBook(){
    const result = await this.service.book.initBookFromLocalJson();
    this.ctx.body = result;
  }
}

module.exports = BookController;
