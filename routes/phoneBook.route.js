const Router = require('koa-router');

const router = new Router({ prefix: '/api/phoneBook' });
const phoneBookControler = require('../controlers/phoneBook.controlers');

router.get(
  '/',
  phoneBookControler.getAll,
);

router.get(
  '/:id',
  phoneBookControler.get,
);

router.post(
  '/',
  phoneBookControler.add,
);

router.patch(
  '/:id',
  phoneBookControler.upd,
);

router.delete(
  '/:id',
  phoneBookControler.del,
);

module.exports = router.routes();
