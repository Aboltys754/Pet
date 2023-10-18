const fs = require('fs');
const Koa = require('koa');
const KoaStatic = require('koa-static');
const bodyParser = require('koa-bodyparser'); 
const app = new Koa();

const temp_list = [
    {
        id: 0,
        name: 'Иванов Иван Иваныч',
        tel: '+78001234567',
    },
    {
        id: 1,
        name: 'Сидоров Сидор Сидорович',
        tel: '+78001234567', 
    },
];


app.use(async (ctx, next) => {   
    
    if (ctx.method === 'POST' && ctx.request.header.authentication === 'createTable') {
        console.log('createTable');
        ctx.body = temp_list;
    }

    if (ctx.method === 'POST' && ctx.request.header.authentication === 'createContact') {
        console.log('createContact')
        console.log(ctx);

        ctx.response.status = 200;
        ctx.response.message = 'ok';
    }

    await next();

});

app.use(KoaStatic('./src/html'));


app.listen(3000);