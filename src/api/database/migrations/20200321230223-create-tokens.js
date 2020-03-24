'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    const TokensTable = queryInterface
      .createTable(
        'tokens',
        {
          id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id',
          },
          access: {
            type: Sequelize.STRING(4096),
            allowNull: false,
            primaryKey: false,
            field: 'access',
          },
          refresh: {
            type: Sequelize.STRING(4096),
            allowNull: false,
            primaryKey: false,
            field: 'refresh',
          },
          userId: {
            type: Sequelize.BIGINT,
            allowNull: false,
            primaryKey: false,
            field: 'userId',
          },
          jti: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: false,
            field: 'jti',
          },
          active: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            field: 'active',
            defaultValue: true,
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
          tableName: 'tokens',
        },
      )
      .then(() => {
        return queryInterface.addConstraint('tokens', ['userId'], {
          type: 'foreign key',
          name: 'tokens_user_id_fk',
          references: {
            table: 'users',
            field: 'id',
          },
        })
      })

    return TokensTable
  },

  down: queryInterface => {
    return queryInterface.dropTable('tokens')
  },
}
