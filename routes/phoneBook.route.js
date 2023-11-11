const Router = require('koa-router');

const router = new Router({ prefix: '/api/phoneBook' });

router.get(
  '/',
  async (ctx) => {
    ctx.status = 200;
    ctx.body = 'get function';
  },
);

router.get(
  '/:id',
  async (ctx) => {
    ctx.status = 200;
    ctx.body = 'get function';
  },
);

router.post(
  '/',
  async (ctx) => {
    ctx.status = 201;
    ctx.body = 'post function';
  },
);

router.patch(
  '/:id',
  async (ctx) => {
    ctx.status = 200;
    ctx.body = 'patch function';
  },
);

router.delete(
  '/:id',
  async (ctx) => {
    ctx.status = 200;
    ctx.body = 'delete function';
  },
);

module.exports = router.routes();
