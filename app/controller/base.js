'use strict';

const Controller = require('egg').Controller;

const SUCCESS_STATUS = 0;
const FAILED_STATUS = 1;
const VALIDATTION_FAILED_STATUS = 2;

class BaseController extends Controller {
  success(data = null, message = 'success'){
    this.ctx.body = {
      status: SUCCESS_STATUS,
      message: message,
      data: data
    }
  }

  failed(message = '操作失败'){
    this.ctx.body = {
      status: FAILED_STATUS,
      message: message,
      data: null
    }
  }

  validationFailed(errors) {
    this.ctx.body = {
      status: VALIDATTION_FAILED_STATUS,
      message: '参数验证失败',
      data: {
        errors: errors
      }
    }
  }
}

module.exports = BaseController;
