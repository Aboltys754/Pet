const Router = require('koa-router');
const { koaBody } = require('koa-body');

const phoneBookValidator = require('../validators/phoneBook.validator');

const router = new Router({ prefix: '/api/phoneBook' });
const phoneBookController = require('../controllers/phoneBook.controllers');

router.get(
  '/',
  phoneBookController.getAll,
);

router.get(
  '/:id',
  phoneBookValidator.id,
  phoneBookController.get,
);

router.post(
  '/',
  koaBody({ multipart: true }),
  phoneBookValidator.name,
  phoneBookValidator.tel,
  phoneBookController.add,
);

router.patch(
  '/:id',
  koaBody({ multipart: true }),
  phoneBookValidator.id,
  phoneBookValidator.name,
  phoneBookValidator.tel,
  phoneBookController.upd,
);

router.delete(
  '/:id',
  phoneBookValidator.id,
  phoneBookController.del,
);

module.exports = router.routes();
