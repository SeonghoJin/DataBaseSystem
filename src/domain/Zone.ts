export class Zone {

    latitude: number;
    longitude: number;
    name?: string;
    zid: number;
    constructor({
        latitude, longitude, name, zid
    }: { latitude: number, longitude: number, name?: string, zid: number }) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.zid = zid;
        this.name = name;
    }

}