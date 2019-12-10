
import BaseController from './base'
import { BranchSrvClient } from '../../generated/archive_pb_service'
import { Empty } from '../../generated/common_pb'

export default class TestController extends BaseController {
    async hello() {
        const { ctx } = this
        const client = new BranchSrvClient('http://localhost:8051')
        client.getBranchGroups(new Empty(), (err, res) => {
            if (err) {
                ctx.body = err
            }
            ctx.body = res
        })
    }
}