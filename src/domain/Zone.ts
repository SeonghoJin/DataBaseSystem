export class Zone {

    name?: string;
    zid: number;
    constructor({
        name, zid
    }: { name?: string, zid: number }) {
        this.zid = zid;
        this.name = name;
    }

}