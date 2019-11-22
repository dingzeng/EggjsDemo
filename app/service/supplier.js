'use strict';

const protoFilePath = __dirname + '/../../protos/archive.proto';
const packageName = 'Archive';
const serviceName = 'SupplierSrv';

module.exports = app => {

    const address = app.config.grpc.address.archive;
    const client = require('../grpcLoader')(protoFilePath, packageName, serviceName, address);
    
    return class SupplierService extends app.Service {
        async echo() {
    
        }
    }
};
