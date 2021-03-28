'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.resources('book','/api/book',controller.book)
  router.get('book','/api/book/search',controller.book.search)
  router.get('book','/api/book/simpleSearch',controller.book.simpleSearch)
  router.get('book','/api/book/getRecommend',controller.book.getRecommend)
  router.get('book','/api/book/getClassification',controller.book.getClassification)
  router.get('book','/api/book/getPageContent/:keyWord/:currentPage/:pageSize',controller.book.getPageContent)
  router.post('book','/api/book/getFavorite',controller.book.getFavorite)
  router.get('book','/api/book/initBook668',controller.book.initBook)

  router.get('register','/api/register',controller.register.valid)
  router.post('register','/api/register',controller.register.process)
  router.post('authorize','/api/login', controller.authorize.login)

  const jwt = app.passport.authenticate('jwt', {session:false, successReturnToOrRedirect:null})
  router.get('token','/api/token/refresh',jwt,controller.token.refresh)
};
