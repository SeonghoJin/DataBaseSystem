export class SessionUser {

    id: string | undefined;
    isAuthenticated: boolean | undefined;
    name: string | string[] | null | undefined;

    constructor({ name, id, isAuthenticated }: { name?: string | string[] | null, id?: string, isAuthenticated?: boolean }) {
        this.id = id;
        this.isAuthenticated = isAuthenticated
        this.name = name;
    }
}