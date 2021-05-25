export class User {
    readonly id: string;
    readonly password: string;

    constructor(id: string, password: string) {
        this.id = id;
        this.password = password;
    }

}