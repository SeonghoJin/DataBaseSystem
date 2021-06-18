export class Home {
    title: string | null | undefined;
    description: string | null | undefined;
    homeIndex: number | undefined;
    zoneId: number | undefined;
    constructor({ title, description, homeIndex, zoneId }:
        {
            title?: string | null | undefined,
            description?: string | null | undefined,
            homeIndex: number | undefined,
            zoneId: number | undefined;
        }) {
        this.title = title;
        this.description = description;
        this.homeIndex = homeIndex;
        this.zoneId = zoneId;
    }
}