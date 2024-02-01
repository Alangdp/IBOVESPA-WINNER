import { Sequelize } from 'sequelize';
import config from '../config/database.js';
export default new Sequelize(config);
