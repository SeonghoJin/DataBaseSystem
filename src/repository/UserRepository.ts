import { Repository, Bean, Connect, IDatabase } from "jypescript";
import { DBconfig } from "../config/index.js";
import { User } from "../domain/User.js";


export interface UserRepository extends Repository<User> {

    getUserById(id: string): Promise<User[]>;
    exist(id: string, password: string): Promise<boolean>;
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

    async exist(id: string, password: string): Promise<boolean> {
        const user: User[] = await this.database.find({ id: id, password: password });
        return user.length !== 0;
    }

    async insert(user: User): Promise<void> {
        return this.database.insert(user);
    }
}

