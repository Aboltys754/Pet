const fs = require('fs');
const Koa = require('koa');
const KoaStatic = require('koa-static');
const { encode } = require('punycode');
const app = new Koa();

const temp_list = []


app.use(async (ctx, next) => {
    if (ctx.url.includes('name')) {
        const name = ctx.url.slice(ctx.url.indexOf('=') + 1, ctx.url.indexOf('&'));
        const tel = ctx.url.slice(ctx.url.indexOf('&') + 5);
        console.log(name);
        console.log(tel);
    }
    
    // if (ctx.method === 'POST') {
    //     // const name = ctx
    //     fs.readFile('./src/html/index.html', 'utf8', (err, data) => {
    //         if (err) {
    //             console.log();
    //             return;
    //         }
    //         console.log(ctx.request);
    //     })
        
    //     await next();
    //     return;
    // }
    await next();
});

app.use(KoaStatic('./src/html'));


app.listen(3000);