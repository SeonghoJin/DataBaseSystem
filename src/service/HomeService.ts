import { AutoWired } from '../core/Ioc/decorator/Autowired.js';
import { User } from '../domain/User.js';
import { ConcreteHomeRepository, HomeRepository } from '../repository/HomeRepository.js';

export class AuthService {

    @AutoWired(ConcreteHomeRepository)
    homeRepository: HomeRepository;



}

