'use strict';

const protoFilePath = __dirname + '/../../../../../Services/protos/archive.proto';
const packageName = 'Archive';
const serviceName = 'ItemSrv';
const address = '127.0.0.1:80051';
const client = require('../grpcLoader')(protoFilePath, packageName, serviceName, address);

const Service = require('egg').Service;

class ItemService extends Service {
    async echo() {

    }
}

module.exports = ItemService;
