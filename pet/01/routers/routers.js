const Router = require('koa-router');
const {koaBody} = require('koa-body');
const router = new Router();
const comandDB = require('../dataBase/comandDB')


// const temp_list = [{id: '1', name: 'rjsds', tel: '89227338165'}];

router.get(
    '/createTableContact',
    (ctx) => {
        console.log('createTable')
        new Promise(
            comandDB.readingContacts()
            .then((values) => {
                console.log(values)
                ctx.response.status = 200;
                ctx.response.message = "data received";
                ctx.body = JSON.stringify(values);
            })
            .catch((error) => {
                ctx.response.status = 400;
                ctx.response.message = `data acquisition error: ${error.message}`;
            })
        )
        
});

router.post(
    '/addContact',
    koaBody({multipart: true}),    
    (ctx) => {
        console.log('addContact')
        comandDB.addContact(ctx.request.body.name, ctx.request.body.tel)
        // const temp_obj = {
        //     id: temp_list.length,
        //     name: ctx.request.body.name,
        //     tel: ctx.request.body.tel,
        // }
        // temp_list.push(temp_obj);
        ctx.response.status = 200;
        ctx.response.message = "OK";
    });

router.patch(
    '/editContact',
    koaBody({multipart: true}),
    async (ctx) => {
        console.log('editContact');          
        let bodyReq = JSON.parse(ctx.request.body);
        comandDB.changeContact(bodyReq.id, bodyReq.name, bodyReq.tel)  
        // temp_list.map((value, index) => {            
        //     if (value.id.toString() === bodyReq.id) {
        //         temp_list[value.id].name = bodyReq.name
        //         temp_list[value.id].tel = bodyReq.tel
        //         ctx.response.status = 200;
        //         ctx.response.message = "OK";
                
        //     }
        // });
        ctx.response.status = 200;
        ctx.response.message = "OK";
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
        // temp_list.map((value, index) => {
        //     if (value.id.toString() === idElem) {
        //         temp_list.splice(index, 1);
        //     }
        // })
        ctx.response.status = 200;
        ctx.response.message = "OK";
    }
)



module.exports = router.routes();