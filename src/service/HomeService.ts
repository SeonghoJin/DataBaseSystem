import { AutoWired } from 'jypescript';
import { DangerZone } from '../domain/DangerZone.js';
import { Home } from '../domain/Home.js';
import { CommentRepository, ConcreteCommentRepository } from '../repository/CommentRepository.js';
import {
    ConcreteMySQLDangerZoneRepository,
    DangerZoneRepository
} from '../repository/DangerZoneRepository.js';
import { ConcreteHomeRepository, HomeRepository } from '../repository/HomeRepository.js';

export class HomeService {

    @AutoWired({
        class: ConcreteHomeRepository
    })
    homeRepository: HomeRepository;

    @AutoWired({
        class: ConcreteMySQLDangerZoneRepository
    })
    dangerZoneRepository: DangerZoneRepository;

    @AutoWired({
        class: ConcreteCommentRepository
    })
    commentRepository: CommentRepository

    constructor() {

    }

    getAllHome = async () => {
        let homes = await this.homeRepository.getAllData();
        return await this.addProperty(homes);
    }

    getHomeByZoneIndex = async (zid: string) => {
        let homes = await this.homeRepository.findByZoneIndex(Number(zid));
        return await this.addProperty(homes);
    }

    findByIndex = async (hid: string) => {
        let homes = await this.homeRepository.findHomeByIndex(Number(hid));
        return await this.addProperty(homes);
    }

    addProperty = async (homes: Home[]) => {
        homes = await this.addDanagerZoneProperty(homes);
        homes = await this.addCommentProperty(homes);
        return homes;
    }

    addDanagerZoneProperty = async (homes: any[]) => {
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

    addCommentProperty = async (homes: any[]) => {
        for (let i = 0; i < homes.length; i++) {
            const comments = await this.
                commentRepository.
                findByhid(homes[i].homeIndex.toString());
            homes[i] = {
                ...homes[i],
                comments: comments
            }
        }
        return homes
    }
}

