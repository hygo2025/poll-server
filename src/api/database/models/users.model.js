module.exports = function(sequelize, DataTypes) {
  const Users = sequelize.define(
    'Users',
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id',
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: false,
        field: 'username',
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: false,
        field: 'password',
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
      tableName: 'users',
    },
  )

  Users.associate = models => {
    Users.hasMany(models.Polls, {
      foreignKey: 'userId',
      as: 'polls',
    })
  }

  return Users
}
