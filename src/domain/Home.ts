export class Home {
    title: string | null | undefined;
    description: string | null | undefined;
    homeIndex: number;

    constructor({ title, description, homeIndex }:
        {
            title?: string | null | undefined,
            description?: string | null | undefined,
            homeIndex: number
        }) {
        this.title = title;
        this.description = description;
        this.homeIndex = homeIndex;
    }
}