module.exports.id = async (ctx, next) => {
  const id = parseInt(ctx.params.id, 10);
  if (!id) {
    ctx.throw(400, 'error id');
  }
  await next();
};

module.exports.name = async (ctx, next) => {
  const name = ctx.request?.body?.name;
  if (!name || name.length < 3) {
    ctx.throw(400, 'little name');
  }
  await next();
};

module.exports.tel = async (ctx, next) => {
  const tel = ctx.request?.body?.tel;
  if (!tel || tel.length < 3) {
    ctx.throw(400, 'little tel');
  }
  await next();
};
