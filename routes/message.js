const Joi = require('joi');
const moment = require('moment')
const models = require('../models');
const CONS = require('../utils/constants')
const { jwtHeaderDefine } = require('../utils/router-helper');

const GROUP_NAME = CONS.ROUTE.MESSAGE

module.exports = [
  {
    method: 'POST',
    path: `/${GROUP_NAME}`,
    handler: async (request, reply) => {
      // new message
      const msg = {
        content: request.payload.content,
        sender_name: request.payload.sender_name,
        sender_avatar: request.payload.sender_avatar,
        sender_openid: request.payload.sender_openid,
        create_time: moment().format(CONS.DATE_FORMAT)
      }

      await models.sequelize.transaction((t) => {
        return models.messages.create(msg, { transaction: t })
      }).then(res => {
        reply({
          status: 1,
          data: res
        });
      }).catch((e) => {
        reply({
          status: 0
        });
      });
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '创建消息',
      validate: {
        payload: {
          content: Joi.string().required(),
          sender_name: Joi.string(),
          sender_avatar: Joi.string().uri(),
          sender_openid: Joi.string().required()
        }
      },
      auth: false
    },
  },
  {
    method: 'GET',
    path: `/${GROUP_NAME}`,
    handler: async (request, reply) => {
      const message = await models.messages.findById(request.query.messageId)
      if (message) {
        reply({
          status: 1,
          data: message
        })
      } else {
        reply({
          status: 0,
          message: 'message not exist'
        })
      }
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '获取消息详情',
      validate: {
        query: {
          messageId: Joi.string().required().description('消息的id'),
        }
      },
      auth: false
    },
  },
  {
    method: 'PATCH',
    path: `/${GROUP_NAME}/{messageId}`,
    handler: async (request, reply) => {
      const message = await models.messages.findById(request.params.messageId)
      if (message) {
        await models.messages.update({
          content: '',
          terminator_name: request.payload.terminator_name,
          terminator_avatar: request.payload.terminator_avatar,
          destroy_flag: true,
          destroy_time: moment().format(CONS.DATE_FORMAT)
        }, {
          where: { id: request.params.messageId }
        }).then(() => {
          reply({status: 1})
        }).catch(e => {
          console.error(`/${GROUP_NAME}/{messageId} error `, e)
          reply({
            status: 0,
            message: 'update error'
          })
        })
      } else {
        reply({
          status: 0,
          message: 'message not exist'
        })
      }
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '更新消息(销毁)',
      validate: {
        params: {
          messageId: Joi.string().required(),
        },
        payload: {
          terminator_name: Joi.string(),
          terminator_avatar: Joi.string().uri()
        }
      },
      auth: false
    },
  },
];