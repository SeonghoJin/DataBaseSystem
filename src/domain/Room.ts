export class Room {

    hid: number | undefined;
    rid: number | undefined;
    description: string | undefined;
    price: number | undefined;
    booker: string | null | undefined;

    constructor({ hid, rid, description, price, booker }: {
        hid: number | undefined,
        rid: number | undefined,
        description: string | undefined,
        price: number | undefined,
        booker: string | null | undefined;
    }) {
        this.hid = hid;
        this.rid = rid;
        this.description = description;
        this.price = price;
        this.booker = booker;
    }
}