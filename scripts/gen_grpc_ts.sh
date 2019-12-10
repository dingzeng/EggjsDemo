#!/bin/bash

# Path to this plugin
PROTOC_GEN_TS_PATH="./node_modules/.bin/protoc-gen-ts"

# Directory to write generated code to (.js and .d.ts files)
OUT_DIR="./generated"

protoc \
    --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
    --js_out="import_style=commonjs,binary:${OUT_DIR}" \
    --ts_out="service=grpc-web:${OUT_DIR}" \
    --proto_path="./protos" \
    ./protos/common.proto \
    ./protos/archive_dtos.proto \
    ./protos/purchase_dtos.proto \
    ./protos/stock_dtos.proto \
    ./protos/system_dtos.proto \
    ./protos/archive.proto \
    ./protos/purchase.proto \
    ./protos/stock.proto \
    ./protos/system.proto \

echo 'done'
    