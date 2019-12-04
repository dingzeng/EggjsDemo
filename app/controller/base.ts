import { Controller } from 'egg';

const { SUCCESS, FAILED, VALIDATTION_FAILED } = require('../codes');

export default class BaseController extends Controller {
  public success(data: any = null, message: string = 'success') {
    this.ctx.body = {
      code: SUCCESS,
      message: message,
      data: data
    }
  }

  public failed(message: string = '操作失败') {
    this.ctx.body = {
      code: FAILED,
      message: message,
      data: null
    }
  }

  public validationFailed(errors: any) {
    this.ctx.body = {
      code: VALIDATTION_FAILED,
      message: '参数验证失败',
      data: {
        errors: errors
      }
    }
  }
}
