const Router = require('koa-router');
const {koaBody} = require('koa-body');
const router = new Router();
const comandDB = require('../dataBase/comandDB')


// const temp_list = [{id: '1', name: 'rjsds', tel: '89227338165'}];

router.get(
    '/createTableContact',
    async (ctx) => {
        console.log('createTable')
            await comandDB.readingContacts()
            .then((values) => {
                console.log(values, 1)
                ctx.body = values;
                ctx.status = 200;
            })
            .catch((error) => {
                ctx.request.message = `data acquisition error: ${error.message}`;
            })   
});

router.post(
    '/addContact',
    koaBody({multipart: true}),    
    async (ctx) => {
        console.log('addContact')
        comandDB.addContact(ctx.request.body.name, ctx.request.body.tel)
        ctx.status = 200;
    });

router.patch(
    '/editContact',
    koaBody({multipart: true}),
    async (ctx) => {
        console.log('editContact');          
        let bodyReq = JSON.parse(ctx.request.body);
        comandDB.changeContact(bodyReq.id, bodyReq.name, bodyReq.tel);
        ctx.status = 200;
    }
)

router.delete(
    '/deleteContact/:id',
    koaBody({multipart: true}),
    async (ctx) => {
        console.log('deleteContact');        
        let indexUrl = ctx.request.URL.pathname.lastIndexOf("/");
        let idElem = ctx.request.URL.pathname.slice(indexUrl + 1);
        comandDB.dropContact(idElem);
        ctx.status = 200;
    }
)



module.exports = router.routes();