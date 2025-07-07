import User from "../entity/user.entity";
import { MySQLDataSource } from "../mysql.datasource";

export default MySQLDataSource.getRepository(User);
