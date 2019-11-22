'use strict';

const protoFilePath = __dirname + '/../../protos/archive.proto';
const packageName = 'Archive';
const serviceName = 'ItemSrv';

module.exports = app => {

    const address = app.config.grpc.address.archive;
    const client = require('../grpcLoader')(protoFilePath, packageName, serviceName, address);

    return class ItemService extends app.Service {
        async echo() {

        }
    }
}
