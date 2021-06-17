import { AutoWired } from 'jypescript';
import { ConcreteHomeRepository, HomeRepository } from '../repository/HomeRepository.js';

export class HomeService {

    @AutoWired({
        class: ConcreteHomeRepository
    })
    homeRepository: HomeRepository;

    constructor() {

    }

    getAllHome = async () => {
        return await this.homeRepository.getAllData();
    }

}

