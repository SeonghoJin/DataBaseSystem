export class Room {

    hid: number | undefined;
    rid: number | undefined;
    description: string | undefined;
    price: number | undefined

    constructor({ hid, rid, description, price }: {
        hid: number | undefined,
        rid: number | undefined,
        description: string | undefined,
        price: number | undefined
    }) {
        this.hid = hid;
        this.rid = rid;
        this.description = description;
        this.price = price;
    }
}