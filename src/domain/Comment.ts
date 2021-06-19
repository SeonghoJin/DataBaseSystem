export class Comment {
    cid?: string
    uid?: string;
    hcid?: string;
    value?: string;

    constructor({ uid, hcid, value, cid }: {
        uid?: string,
        hcid?: string,
        value?: string,
        cid?: string
    }) {
        this.uid = uid;
        this.hcid = hcid;
        this.value = value;
        this.cid = cid;
    }

}