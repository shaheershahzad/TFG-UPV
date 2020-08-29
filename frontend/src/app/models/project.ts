export class Project {

    constructor(_id="", name="", description="", coordinates="", location="", volunteers=[]){
        this._id = _id;
        this.name = name;
        this.description = description;
        this.coordinates = coordinates;
        this.location = location;
        this.volunteers = volunteers;
    }

    _id: String;
    name: String;
    description: String;
    coordinates: String;
    location: String;
    volunteers: String[];
}
