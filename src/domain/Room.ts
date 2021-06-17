export class Room {

    hid: number | undefined;
    rid: number | undefined;
    description: string | undefined;
    price: number | undefined;
    isReservation: boolean | undefined;

    constructor({ hid, rid, description, price, isReservation }: {
        hid: number | undefined,
        rid: number | undefined,
        description: string | undefined,
        price: number | undefined,
        isReservation: boolean | undefined
    }) {
        this.hid = hid;
        this.rid = rid;
        this.description = description;
        this.price = price;
        this.isReservation = isReservation;
    }
}