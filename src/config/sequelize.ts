import dotenv from "dotenv";
import { Sequelize } from "sequelize-typescript";
dotenv.config();

const my_sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE_NAME,
});

export { my_sequelize };
