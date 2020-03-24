'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    const UsersTable = queryInterface
      .createTable(
        'users',
        {
          id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id',
          },
          username: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: false,
            field: 'username',
          },
          password: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: false,
            field: 'password',
          },
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.fn('now'),
            field: 'created_at',
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.fn('now'),
            field: 'updated_at',
          },
        },
        {
          tableName: 'users',
        },
      )
      .then(() => {
        return queryInterface.addConstraint('users', ['username'], {
          type: 'unique',
          name: 'users_un',
        })
      })

    return UsersTable
  },

  down: queryInterface => {
    return queryInterface.dropTable('users')
  },
}
