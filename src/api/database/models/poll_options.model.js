module.exports = function(sequelize, DataTypes) {
  const PollOptions = sequelize.define(
    'PollOptions',
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id',
      },
      value: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: false,
        field: 'value',
      },
      pollId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: false,
        field: 'pollId',
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
      tableName: 'polloptions',
    },
  )

  PollOptions.associate = models => {
    PollOptions.belongsTo(models.Polls, {
      foreignKey: 'pollId',
      as: 'poll',
    })
  }

  return PollOptions
}
