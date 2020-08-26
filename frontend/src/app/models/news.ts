export class News {
    _id: String;
    name: String;
    description: String;
    link: String;

    constructor(_id="", name="", description="", link=""){
        this._id = _id;
        this.name = name;
        this.description = description;
        this.link = link;
    }
}
