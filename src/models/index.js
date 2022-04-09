'use strict';

import fs from 'fs';
import { Sequelize } from 'sequelize';
import { config } from 'dotenv';
config();
const db = {};

let sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
	host: process.env.DB_HOST,
	dialect: process.env.DB_DIALECT,
	logging: false,
});

fs.readdirSync('./src/models')
	.filter(file => file.endsWith('.js') && file !== 'index.js')
	.forEach(async file => {
		const model = await import(`./${file}`);
		db[model.name] = model;
	});

Object.keys(db).forEach(modelName => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

export { sequelize, Sequelize };
