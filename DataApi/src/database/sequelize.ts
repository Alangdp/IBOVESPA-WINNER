import sequelize, { Sequelize } from 'sequelize';
import config from '../config/database';

export default new Sequelize(config);
