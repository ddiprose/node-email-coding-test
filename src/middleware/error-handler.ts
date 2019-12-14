export async function errorHandler(ctx, next) {
  try {
    await next();
  } catch (err) {
    ctx.type = 'json';
    ctx.status = err.status || 500;
    ctx.body = {
      status: 'error',
      message: err.message
    };
    ctx.app.emit('error', err, ctx);
  }
}
