export class Project {

    constructor(_id="", name="", description="", coordinates=""){
        this._id = _id;
        this.name = name;
        this.description = description;
        this.coordinates = coordinates;
    }

    _id: String;
    name: String;
    description: String;
    coordinates: String;
}
