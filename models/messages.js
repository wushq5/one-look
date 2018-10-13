module.exports = (sequelize, DataTypes) => sequelize.define(
  'messages',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    sender_name: DataTypes.STRING(16),
    sender_avatar: DataTypes.STRING(255),
    sender_openid: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    terminator_name: DataTypes.STRING(16),
    terminator_avatar: DataTypes.STRING(255),
    create_time: DataTypes.STRING(32),
    destroy_time: DataTypes.STRING(32),
    destroy_flag: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    }
  },
  {
    tableName: 'messages',
    timestamps: false
  },
);