import { Request, Response } from 'express';
import { AutoWired } from '../core/Ioc/decorator/Autowired.js';
import { Bean } from '../core/Ioc/decorator/Bean.js';
import { User } from '../domain/User.js';
import { ConcreteUserRepository, UserRepository } from '../repository/UserRepository.js';

export class AuthService {

    @AutoWired(ConcreteUserRepository)
    userRepository: UserRepository;

    public async Login(name: string | string[]) {
        if (Array.isArray(name)) {
            name = name.join('');
        }
        return this.userRepository.exist(name);
    }

    public async SignUp(name: string | string[]) {
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
