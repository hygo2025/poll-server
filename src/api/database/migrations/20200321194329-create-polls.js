'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    const PollsTable = queryInterface
      .createTable(
        'polls',
        {
          id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id',
          },
          title: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: false,
            field: 'title',
          },
          userId: {
            type: Sequelize.BIGINT,
            allowNull: true,
            primaryKey: false,
            field: 'userId',
          },
          loginRequired: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            primaryKey: false,
            field: 'loginRequired',
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
          tableName: 'polls',
        },
      )
      .then(() => {
        return queryInterface.addConstraint('polls', ['userId'], {
          type: 'foreign key',
          name: 'polls_user_id_fk',
          references: {
            table: 'users',
            field: 'id',
          },
        })
      })

    return PollsTable
  },

  down: queryInterface => {
    return queryInterface.dropTable('polls')
  },
}
