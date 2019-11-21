'use strict';
var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');

module.exports = (protoFilePath, packageName, serviceName, address) => {
    var packageDefinition = protoLoader.loadSync(
        protoFilePath,
        {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true
        });

    var serviceCtor = grpc.loadPackageDefinition(packageDefinition)[packageName][serviceName];
    return new serviceCtor(address, grpc.credentials.createInsecure());
}