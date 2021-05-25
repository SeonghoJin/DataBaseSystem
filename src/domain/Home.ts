export class Home {
    title: string | null | undefined;
    description: string | null | undefined;
    roomCount: number | null | undefined;
    homeIndex: number | null | undefined;

    constructor({ title, description, roomCount, homeIndex }:
        {
            title: string | null | undefined,
            description: string | null | undefined,
            roomCount: number | null | undefined,
            homeIndex: number | null | undefined
        }) {
        this.title = title;
        this.description = description;
        this.roomCount = roomCount;
        this.homeIndex = homeIndex;
    }
}