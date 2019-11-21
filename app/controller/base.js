'use strict';

const Controller = require('egg').Controller;
const { SUCCESS, FAILED, VALIDATTION_FAILED } = require('../codes');

class BaseController extends Controller {
  success(data = null, message = 'success') {
    this.ctx.body = {
      code: SUCCESS,
      message: message,
      data: data
    }
  }

  failed(message = '操作失败') {
    this.ctx.body = {
      code: FAILED,
      message: message,
      data: null
    }
  }

  validationFailed(errors) {
    this.ctx.body = {
      code: VALIDATTION_FAILED,
      message: '参数验证失败',
      data: {
        errors: errors
      }
    }
  }
}

module.exports = BaseController;
