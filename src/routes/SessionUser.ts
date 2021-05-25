export class SessionUser {

    id: string;
    isAuthenticated: boolean;
    name: string | string[] | null;


    constructor({ name, id, isAuthenticated }: { name: string | string[] | null, id: string, isAuthenticated: boolean }) {
        this.id = id;
        this.isAuthenticated = isAuthenticated
        this.name = name;
    }
}