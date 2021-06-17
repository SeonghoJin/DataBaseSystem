import { AutoWired } from 'jypescript';
import { User } from '../domain/User.js';
import { ConcreteUserRepository, UserRepository } from '../repository/UserRepository.js';

export class AuthService {

    @AutoWired({ class: ConcreteUserRepository })
    userRepository: UserRepository;

    public async login(name: string | string[], password: string | string[]) {
        if (Array.isArray(name)) {
            name = name.join('');
        }
        if (Array.isArray(password)) {
            password = password.join('');
        }
        return await this.userRepository.exist(name, password);
    }

    public async singUp(name: string | string[], password: string | string[]) {
        if (Array.isArray(name)) {
            name = name.join('');
        }
        if (Array.isArray(password)) {
            password = password.join('');
        }

        const id = await this.userRepository.getUserById(name);
        if (id.length !== 0) return false;

        this.userRepository.insert(new User(name, password));
        return true;
    }

    public vaildEmail(email: String): boolean {
        const spEmail: string[] = email.split('@');
        return spEmail.length == 2 && spEmail[1] != '';
    }
}
