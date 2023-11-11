module.exports.get = async (ctx) => {
  ctx.status = 200;
  ctx.body = 'get function';
};

module.exports.getAll = async (ctx) => {
  ctx.status = 200;
  ctx.body = 'get function';
};

module.exports.add = async (ctx) => {
  ctx.status = 201;
  ctx.body = 'post function';
};

module.exports.upd = async (ctx) => {
  ctx.status = 200;
  ctx.body = 'patch function';
};

module.exports.del = async (ctx) => {
  ctx.status = 200;
  ctx.body = 'delete function';
};
