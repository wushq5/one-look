const { jwtHeaderDefine, paginationDefine } = require('../utils/router-helper');

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
      reply('hello hapi');
    },
    config: {
      tags: ['api', 'test'],
      description: '测试hello-hapi',
      auth: false
    },
  },
  {
    method: 'GET',
    path: '/test/auth',
    handler: (request, reply) => {
      reply(request.auth.credentials);
    },
    config: {
      tags: ['api', 'test'],
      description: '测试auth',
      validate: {
        ...jwtHeaderDefine, // 增加需要 jwt auth 认证的接口 header 校验
      },
    },
  },
  {
    method: 'GET',
    path: '/test/pagination',
    handler: (request, reply) => {
      console.log(request.query)
      reply('pagination test');
    },
    config: {
      tags: ['api', 'test'],
      description: '测试pagination',
      validate: {
        query: {
          ...paginationDefine,
        },
      },
      auth: false
    },
  }
];