export class Event {
    _id: String;
    name: String;
    description: String;
    location: String;
    date: String;
    time: String;

    constructor(_id="", name="", description="", location="", date="", time=""){
        this._id = _id;
        this.name = name;
        this.description = description;
        this.location = location;
        this.date = date;
        this.time = time;
    }
}
