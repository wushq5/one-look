const Joi = require('joi')
const axios = require('axios')
const config = require('../config')
const CONS = require('../utils/constants')

const GROUP_NAME = CONS.ROUTE.USER

module.exports = [
  {
    method: 'POST',
    path: `/${GROUP_NAME}/wxLogin`,
    handler: async (req, reply) => {
      const appid = config.wxAppid
      const secret = config.wxSecret
      const { code } = req.payload
      const response = await axios({
        url: 'https://api.weixin.qq.com/sns/jscode2session',
        method: 'GET',
        params: {
          appid,
          secret,
          js_code: code,
          grant_type: 'authorization_code',
        }
      })
      // { openid, session_key }
      reply(response.data)
    },
    config: {
      auth: false, // 不需要用户验证
      tags: ['api', GROUP_NAME], // 注册 swagger 文档
      validate: {
        payload: {
          code: Joi.string().required().description('微信用户登录的临时code')
        },
      },
    },
  }
]