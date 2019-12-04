'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('Review', 'username', {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        })
    },

    down: (queryInterface, Sequelize) => {
        /*
                      Add reverting commands here.
                      Return a promise to correctly handle asynchronicity.

                      Example:
                      return queryInterface.dropTable('users');
                    */
    }
};