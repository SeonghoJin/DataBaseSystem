import { Repository } from "jypescript";
import { Zone } from "../domain/Zone";

interface ZoneRepository extends Repository<Zone> {
    findById(zid: number): Promise<Zone>;
    findAll(): Promise<Zone[]>

}