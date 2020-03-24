module.exports = function(sequelize, DataTypes) {
  const Answers = sequelize.define(
    'Answers',
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id',
      },
      userId: {
        type: DataTypes.BIGINT,
        allowNull: true,
        primaryKey: false,
        field: 'userId',
      },
      optionId: {
        type: DataTypes.BIGINT,
        allowNull: true,
        primaryKey: false,
        field: 'optionId',
      },
      pollId: {
        type: DataTypes.BIGINT,
        allowNull: true,
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
      tableName: 'answers',
    },
  )

  return Answers
}
