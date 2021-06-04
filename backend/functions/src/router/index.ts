import Router, { IMiddleware } from 'koa-router';
import querystring from 'querystring';
import axios from 'axios';
import { FUNCTION_BASE_URL } from '@/constants';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const REDIRECT_URI = `${FUNCTION_BASE_URL}/${process.env.SPOTIFY_REDIRECT_PATH}`;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const CLIENT_AUTH_ENDPOINT = process.env.CLIENT_AUTH_ENDPOINT;

declare module 'koa' {
  interface IncomingMessage {
    body: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [key: string]: any;
    };
  }
}

const router = new Router();

router.get('/', async (ctx) => {
  ctx.status = 200;
  ctx.body = {
    result: 'TEST ok',
  };
});

/**
 * Prompt user to obtain auth access permission.
 * Upon user input, it redirects to /auth/callback.
 */
router.get('/auth/authorize', async (ctx) => {
  const authQueryParams = querystring.stringify({
    response_type: 'code',
    client_id: CLIENT_ID,
    scope: 'user-read-private user-read-email user-top-read playlist-read-private playlist-read-collaborative',
    redirect_uri: REDIRECT_URI,
    state: 'test',
    show_dialog: true,
  });

  ctx.redirect(`https://accounts.spotify.com/authorize?${authQueryParams}`);
});

/**
 * Receive user access from Spotify API
 * Redirects back to client and add access_token to URI
 */
router.get('/auth/callback', async (ctx) => {
  if (ctx.query.code) {
    const tokenQueryParams = querystring.stringify({
      grant_type: 'authorization_code',
      code: ctx.query.code,
      redirect_uri: REDIRECT_URI,
    });

    const res = await axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: tokenQueryParams,
    });

    if (res.data.error) {
      ctx.redirect(`${CLIENT_AUTH_ENDPOINT}/?${querystring.stringify({
        state: ctx.query.state,
        error: res.data.error,
      })}`);
    } else {
      ctx.redirect(`${CLIENT_AUTH_ENDPOINT}/?${querystring.stringify({
        state: ctx.query.state,
        access_token: res.data.access_token,
        refresh_token: res.data.refresh_token,
        expires_in: res.data.expires_in,
      })}`);
    }
  } else {
    ctx.redirect(`${CLIENT_AUTH_ENDPOINT}/?${querystring.stringify({
      state: ctx.query.state,
      error: 'null_code',
    })}`);
  }
});

/**
 * Get a new access_token
 * @param refresh_token string
 */
router.post('/auth/refresh_token', async (ctx) => {
  const tokenQueryParams = querystring.stringify({
    grant_type: 'refresh_token',
    refresh_token: ctx.req.body.refresh_token,
  });

  const res = await axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: tokenQueryParams,
  });

  ctx.status = 200;
  ctx.body = {
    access_token: res.data.access_token,
    expires_in: res.data.expires_in,
  };
});

export function createRouter(): IMiddleware {
  return router.routes();
}
