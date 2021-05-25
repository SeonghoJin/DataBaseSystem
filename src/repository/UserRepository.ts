import { DBconfig } from "../config/index.js";
import { Connect } from "../core/database/decorator/Connect.js";
import { IDatabase } from "../core/database/interface/IDataBase.js";
import { Repository } from "../core/database/repository/Repository.js";
import { Bean } from "../core/Ioc/decorator/Bean.js";
import { User } from "../domain/User.js";


export interface UserRepository extends Repository<User> {

    getUserById(id: string): Promise<User[]>;
    exist(id: string): Promise<boolean>;
    insert(user: User): Promise<void>;

}

@Bean()
export class ConcreteUserRepository implements UserRepository {

    @Connect(DBconfig)
    database: IDatabase;

    constructor() {
    }
    async getUserById(id: string): Promise<User[]> {
        return this.database.find({ id: id });
    }

    async exist(id: string): Promise<boolean> {
        const user: User[] = await this.database.find({ id: id });
        return user.length !== 0;
    }

    async insert(user: User): Promise<void> {
        return this.database.insert(user);
    }
}

