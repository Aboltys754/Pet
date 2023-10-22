const Koa = require('koa');
const KoaStatic = require('koa-static');
const Router = require('koa-router');
const router = require('./routers/routers');
const app = new Koa();


app.use(KoaStatic('./html'));
app.use(router);



app.listen(3000, (error) => {
    if (error) {
        console.log(error)
        return
    }
    console.log('Server start http://localhost:3000/')

});