import dotenv from 'dotenv';

dotenv.config();
const config = {
  dialect: 'mysql',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  define: {
    timestamps: true,
    underscored: true,
  },
  dialectOptions: {},
  timezone: 'America/Sao_Paulo',
};
export default config;
