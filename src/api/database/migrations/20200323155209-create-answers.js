'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    const AnswersTable = queryInterface.createTable(
      'answers',
      {
        id: {
          type: Sequelize.BIGINT,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          field: 'id',
        },
        userId: {
          type: Sequelize.BIGINT,
          allowNull: true,
          primaryKey: false,
          field: 'userId',
        },
        optionId: {
          type: Sequelize.BIGINT,
          allowNull: true,
          primaryKey: false,
          field: 'optionId',
        },
        pollId: {
          type: Sequelize.BIGINT,
          allowNull: true,
          primaryKey: false,
          field: 'pollId',
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
        tableName: 'answers',
      },
    )

    return AnswersTable
  },

  down: queryInterface => {
    return queryInterface.dropTable('answers')
  },
}
