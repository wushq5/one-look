'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(
    'messages',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      content: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      sender_name: Sequelize.STRING(16),
      sender_avatar: Sequelize.STRING(255),
      sender_openid: {
        type: Sequelize.STRING(64),
        allowNull: false,
      },
      terminator_name: Sequelize.STRING(16),
      terminator_avatar: Sequelize.STRING(255),
      create_time: Sequelize.STRING(32),
      destroy_time: Sequelize.STRING(32),
      destroy_flag: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      }
    },
  ),

  down: queryInterface => queryInterface.dropTable('messages')
};
