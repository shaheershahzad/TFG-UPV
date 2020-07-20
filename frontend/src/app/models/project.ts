export class Project {

    constructor(_id="", name="", description=""){
        this._id = _id;
        this.name = name;
        this.description = description;
    }

    _id: String;
    name: String;
    description: String;
}
