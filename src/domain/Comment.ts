export class Comment {
    uid?: string;
    hcid?: string;
    value?: string;

    constructor({ uid, hcid, value }: {
        uid?: string,
        hcid?: string,
        value?: string
    }) {
        this.uid = uid;
        this.hcid = hcid;
        this.value = value;
    }

}