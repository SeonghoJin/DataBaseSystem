export class Home {
    title: string | null | undefined;
    description: string | null | undefined;
    homeIndex: number;
    zoneId: number;
    constructor({ title, description, homeIndex, zoneId }:
        {
            title?: string | null | undefined,
            description?: string | null | undefined,
            homeIndex: number,
            zoneId: number;
        }) {
        this.title = title;
        this.description = description;
        this.homeIndex = homeIndex;
        this.zoneId = zoneId;
    }
}