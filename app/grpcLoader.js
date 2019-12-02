'use strict';
var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');

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
        return new Promise(function (resolve, reject) {
            client[method](param, function (error, feature) {
                if (error) {
                    reject(error)
                } else {
                    resolve(feature)
                }
            });
        })
    }
    return client;
}