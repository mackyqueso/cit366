export class Contact {
    public contactId: number;
    public name: string;
    public email: string;
    public phone: string;
    public imageUrl: string;
    public group: [];

    constructor(id: number, name: string, email: string, phone: string, imgUrl: string, group: []){
        this.contactId = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.imageUrl = imgUrl;
        this.group = group;
    }
}