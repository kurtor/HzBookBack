module.exports = app =>{
    app.passport.verify(async (ctx, user) =>{
        ctx.payload = user.payload;
        return user.payload;
    })
}