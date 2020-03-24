module.exports = function(sequelize, DataTypes) {
  const Polls = sequelize.define(
    'Polls',
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id',
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: false,
        field: 'title',
      },
      userId: {
        type: DataTypes.BIGINT,
        allowNull: true,
        primaryKey: false,
        field: 'userId',
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn('now'),
        field: 'created_at',
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn('now'),
        field: 'updated_at',
      },
    },
    {
      tableName: 'polls',
    },
  )

  Polls.associate = models => {
    Polls.belongsTo(models.Users, {
      foreignKey: 'userId',
      as: 'user',
    })

    Polls.hasMany(models.PollOptions, {
      foreignKey: 'pollId',
      as: 'pollOptions',
    })
  }

  return Polls
}
