import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import User from "./entity/user.entity";
import UserFormData from "./entity/users-form-data.entity";

dotenv.config({ path: __dirname + "/../../.env" });

export const MySQLDataSource = new DataSource({
  type: "mysql",
  host: "localhost", // Your MySQL host
  port: 3306, // Your MySQL port
  username: process.env.MYSQL_DATABASE_USER, // Your MySQL username
  password: process.env.MYSQL_DATABASE_PASSWORD, // Your MySQL password
  database: process.env.MYSQL_DATABASE_DB, // Your MySQL database name
  entities: [User, UserFormData], // Path to your entity files
  synchronize: true, // Auto-create/update database schema (use with caution in production)
  logging: false, // Enable/disable SQL query logging
});
