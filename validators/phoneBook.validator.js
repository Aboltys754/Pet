module.exports.id = async (ctx, next) => {
  const id = parseInt(ctx.params.id, 10);
  if (!id) {
    ctx.status = 400;
    ctx.body = 'error id';
    return;
  }
  await next();
};

module.exports.name = async (ctx, next) => {
  const name = ctx.request?.body?.name;
  if (!name || name.length < 3) {
    ctx.status = 400;
    ctx.body = 'little name';
    return;
  }
  await next();
};

module.exports.tel = async (ctx, next) => {
  const tel = ctx.request?.body?.tel;
  if (!tel || tel.length < 3) {
    ctx.status = 400;
    ctx.body = 'little tel';
    return;
  }
  await next();
};
