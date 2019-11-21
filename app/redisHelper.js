'use strict';
const redis = require('redis');

const client = redis.createClient({
    // host: '192.168.0.102',
    host: '127.0.0.1',
    port: 6379
})

module.exports = {
    get(key) {
        return new Promise(function (resolve, reject) {
            client.get(key, function (error, reply) {
                console.log(error, reply)
                resolve(reply)
            })
        })
    },
    set(key, value, seconds = 10) {
        return new Promise(function (resolve, reject) {
            let val = value
            if (typeof value == 'object') {
                val = JSON.stringify(value)
            }
            client.set(key, val, 'EX', seconds, function (error, reply) {
                if (error) {
                    reject(error)
                } else {
                    resolve(reply)
                }
            })
        })
    }
};