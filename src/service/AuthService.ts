import { AutoWired } from 'jypescript';
import { User } from '../domain/User.js';
import { ConcreteUserRepository, UserRepository } from '../repository/UserRepository.js';

export class AuthService {

    @AutoWired({ class: ConcreteUserRepository })
    userRepository: UserRepository;

    public async login(name: string | string[]) {
        if (Array.isArray(name)) {
            name = name.join('');
        }
        return this.userRepository.exist(name);
    }

    public async singUp(name: string | string[]) {
        if (Array.isArray(name)) {
            name = name.join('');
        }
        this.userRepository.insert(new User(name, name));
        return true;
    }

    public async isUser(id: string) {
    }


    public vaildEmail(email: String): boolean {
        const spEmail: string[] = email.split('@');
        return spEmail.length == 2 && spEmail[1] != '';
    }
}
