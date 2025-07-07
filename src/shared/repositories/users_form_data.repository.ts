import UserFormData from "../entity/users-form-data.entity";
import { MySQLDataSource } from "../mysql.datasource";

export default MySQLDataSource.getRepository(UserFormData);
