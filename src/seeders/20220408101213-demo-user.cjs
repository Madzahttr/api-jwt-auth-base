/* eslint-disable no-unused-vars */
'use strict';
const bcrypt = require('bcrypt');

module.exports = {
	async up (queryInterface, Sequelize) {
		return queryInterface.bulkInsert('Users', [{
			id: 39785430973485,
			userName: 'Test',
			email: 'test@test.com',
			password: bcrypt.hashSync('test', 10),
			createdAt: new Date(),
			updatedAt: new Date()
		}]);
	},

	async down (queryInterface, Sequelize) {
		return queryInterface.bulkDelete('Users', null, {});
	}
};
