'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    const PollOptionsTable = queryInterface
      .createTable(
        'polloptions',
        {
          id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id',
          },
          value: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: false,
            field: 'value',
          },
          pollId: {
            type: Sequelize.BIGINT,
            allowNull: false,
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
          tableName: 'polloptions',
        },
      )
      .then(() => {
        return queryInterface.addConstraint('polloptions', ['pollId'], {
          type: 'foreign key',
          name: 'polloptions_poll_id_fk',
          references: {
            table: 'polls',
            field: 'id',
          },
        })
      })

    return PollOptionsTable
  },

  down: queryInterface => {
    return queryInterface.dropTable('polloptions')
  },
}
