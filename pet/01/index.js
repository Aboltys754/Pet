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
    if (ctx.method === 'GET' && ctx.url.includes('name')) {
        const newName = ctx.url.slice(ctx.url.indexOf('=') + 1, ctx.url.indexOf('&'));
        const newTel = ctx.url.slice(ctx.url.indexOf('&') + 5);
        console.log(ctx)
        console.log(newName)
        console.log(newTel)
        const idTempList = temp_list.length;
        const temp_obj = {
            id: idTempList,
            name: newName,
            tel: newTel,
        }
        temp_list.push(temp_obj);
        await next();
        return;
    }
    
    // if (ctx.method === 'POST') {
    //     fs.readFile('./src/html/index.html', 'utf8', (err, data) => {
    //         if (err) {
    //             console.log('Ошибка', err);
    //             return;
    //         }
    //         console.log(ctx.request);
    //     })
    //     console.log("1")
    //     await next();
    // }

    // if (ctx.method === 'GET' && ctx.url === '/')
    //     await fs.readFile('./src/html/index.html', 'utf8', (err, data) => {
    //             if (err) {
    //                 console.log('Ошибка', err);
    //                 return;
    //             }
    //             console.log(typeof data);
    //         console.log(ctx.method, ctx.url);
    //         })
            
    // await next();

    if (ctx.method === 'POST' && ctx.request.header.authentication) {

        ctx.body = temp_list
    }

    await next();

});

app.use(KoaStatic('./src/html'));


app.listen(3000);