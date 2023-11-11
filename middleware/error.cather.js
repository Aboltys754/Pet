module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    if (error.status) {
      ctx.status = error.status;
      ctx.body = {
        error: error.message,
      };
      return;
    }
    ctx.status = 500;
    ctx.body = {
      error: 'internel server error',
    };
    console.log(error);
  }
};
