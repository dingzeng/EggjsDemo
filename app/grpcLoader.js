'use strict';
var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');

function convert(value, fn) {
    const type = Object.prototype.toString.call(value)
    if (type === '[object Array]') {
        const newArr = []
        for (let index = 0; index < value.length; index++) {
            newArr.push(convert(value[index], fn))
        }
        return newArr
    } else if (type === '[object Object]') {
        const newObj = {}
        for (const key in value) {
            const newKey = fn(key)
            newObj[newKey] = convert(value[key], fn)
        }
        return newObj
    } else {
        return value
    }
}

module.exports = (protoFilePath, packageName, serviceName, address) => {
    var packageDefinition = protoLoader.loadSync(
        protoFilePath,
        {
            keepCase: false,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true
        });

    var serviceCtor = grpc.loadPackageDefinition(packageDefinition)[packageName][serviceName];
    const client = new serviceCtor(address, grpc.credentials.createInsecure());
    client.call = async function (method, param = {}) {
        // eg: productId -> ProductId
        if (param) {
            param = convert(param, function (key) {
                return key[0].toUpperCase() + key.substring(1)
            })
        }
        return new Promise(function (resolve, reject) {
            client[method](param, function (error, feature) {
                if (error) {
                    reject(error)
                } else {
                    // eg ProductId -> productId
                    if (feature) {
                        feature = convert(feature, function (key) {
                            return key[0].toLowerCase() + key.substring(1)
                        })
                    }
                    resolve(feature)
                }
            });
        })
    }
    return client;
}