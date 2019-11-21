
const redis = require('../redisHelper')

const NO_TOKEN_HEADER = 99;
const TOKEN_EXPIRED = 98;

module.exports = options => {
    return async function auth(ctx, next){
        const ignore = options.ignore;
        if(ignore){
            if(new RegExp(ignore).test(ctx.url)){
                await next();
                return;
            }
        }

        const token = ctx.headers['token']
        if(!token){
            ctx.body = {
                status: NO_TOKEN_HEADER,
                message: '请求头中缺少token信息',
                data: {}
            }
            return
        }

        const exists = await redis.get(token);
        if(!exists){
            ctx.body = {
                status: TOKEN_EXPIRED,
                message: 'token已过期',
                data: {}
            }
            return
        }
        await next()
    }
}