module.exports = function(sequelize, DataTypes) {
  const Tokens = sequelize.define(
    'Tokens',
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id',
      },
      access: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: false,
        field: 'access',
      },
      refresh: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: false,
        field: 'refresh',
      },
      userId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: false,
        field: 'userId',
      },
      jti: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: false,
        field: 'jti',
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        field: 'active',
        defaultValue: true,
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
      tableName: 'tokens',
    },
  )

  Tokens.associate = models => {
    Tokens.belongsTo(models.Users, {
      foreignKey: 'userId',
      as: 'user',
    })
  }

  return Tokens
}
