import { AutoWired } from 'jypescript';
import { ConcreteHomeRepository, HomeRepository } from '../repository/HomeRepository.js';

export class AuthService {

    @AutoWired({
        class: ConcreteHomeRepository
    })
    homeRepository: HomeRepository;



}

