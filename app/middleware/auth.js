
const redis = require('../redisHelper')
const { ILLEGAL_TOKEN, TOKEN_EXPIRED } = require('../codes');

module.exports = options => {
    return async function auth(ctx, next) {
        const ignore = options.ignore;
        if (ignore) {
            if (new RegExp(ignore).test(ctx.url)) {
                await next();
                return;
            }
        }

        const token = ctx.headers['token']
        if (!token) {
            ctx.body = {
                code: ILLEGAL_TOKEN,
                message: 'Illegal token',
                data: {}
            }
            return
        }

        const exists = await redis.get(token);
        if (!exists) {
            ctx.body = {
                code: TOKEN_EXPIRED,
                message: 'Token expired',
                data: {}
            }
            return
        }
        await next()
    }
}