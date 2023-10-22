const Router = require('koa-router');
const {koaBody} = require('koa-body');
const router = new Router();


const temp_list = [];

router.get(
    '/createTableContact',
    (ctx) => {  ctx.body = temp_list;
        console.log('createTable')
        ctx.body = temp_list;
});

router.post(
    '/addContact',
    koaBody({multipart: true}),    
    (ctx) => {
        console.log('addContact')
        const temp_obj = {
            id: temp_list.length,
            name: ctx.request.body.name,
            tel: ctx.request.body.tel,
        }
        temp_list.push(temp_obj);
        ctx.response.status = 200;
        ctx.response.message = "OK";
    });

router.patch(
    '/editContact',
    koaBody({multipart: true}),
    async (ctx) => {
        console.log('editContact');  
        let bodyReq = JSON.parse(ctx.request.body);    
        temp_list.map((value, index) => {            
            if (value.id.toString() === bodyReq.id) {
                temp_list[value.id].name = bodyReq.name
                temp_list[value.id].tel = bodyReq.tel
                ctx.response.status = 200;
                ctx.response.message = "OK";
                
            }
        });
    }
)

router.delete(
    '/deleteContact/:id',
    koaBody({multipart: true}),
    async (ctx) => {
        console.log('deleteContact');
        let indexUrl = ctx.request.URL.pathname.lastIndexOf("/");
        let idElem = ctx.request.URL.pathname.slice(indexUrl + 1);
        temp_list.map((value, index) => {
            if (value.id.toString() === idElem) {
                temp_list.splice(index, 1);
            }
        })
        ctx.response.status = 200;
        ctx.response.message = "OK";
    }
)



module.exports = router.routes();