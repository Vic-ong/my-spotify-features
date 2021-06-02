import Koa from 'koa';
import cors from '@koa/cors';
import logger from 'koa-logger';
import { createRouter } from '@/router/index';

// Setup
const app = new Koa();

app.use(cors());
app.use(logger());

// Error handling
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    const status = err.statusCode || err.status || 500;
    err.status = status;
    ctx.status = status;
    ctx.body = {
      error: err.message || err,
    };
    ctx.app.emit('error', err, ctx);
  }
});

// Routes
app.use(createRouter());

// Error logging
app.on('error', (err) => {
  console.log('Internal Server Error!\n', err);
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function createApiServer() {
  return app.callback();
}
