import { AutoWired } from 'jypescript';
import { DangerZone } from '../domain/DangerZone.js';
import { Home } from '../domain/Home.js';
import { ConcreteDangerZoneRepository } from '../repository/DangerZoneRepository.js';
import { ConcreteHomeRepository, HomeRepository } from '../repository/HomeRepository.js';

export class HomeService {

    @AutoWired({
        class: ConcreteHomeRepository
    })
    homeRepository: HomeRepository;

    @AutoWired({
        class: ConcreteDangerZoneRepository
    })
    dangerZoneRepository: ConcreteDangerZoneRepository;

    constructor() {

    }

    getAllHome = async () => {
        let homes = await this.homeRepository.getAllData();
        return await this.addDanagerZoneProperty(homes);
    }

    getHomeByZoneIndex = async (zid: string) => {
        let homes = await this.homeRepository.findByZoneIndex(Number(zid));
        return await this.addDanagerZoneProperty(homes);
    }

    addDanagerZoneProperty = async (homes: Home[]) => {
        let dangerZones = await this.dangerZoneRepository.findAll();
        homes = homes.map((home: Home) => {
            const danagerZoneId = dangerZones.find((dangerZone: DangerZone) => {
                return dangerZone.dangerZoneId === home.zoneId
            });
            let danger = danagerZoneId !== undefined;
            return {
                ...home,
                danger: danger
            }
        })
        return homes;
    }
}

