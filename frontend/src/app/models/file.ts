export class FileModel {
    constructor(_id="", name="", path="", size="", type="", projectId="", uploaderId=""){
        this._id = _id;
        this.name = name;
        this.path = path;
        this.size = size;
        this.type = type;
        this.projectId = projectId;
        this.uploaderId = uploaderId;
    }

    _id: String;
    name: String;
    path: String;
    size: String;
    type: String;
    projectId: String;
    uploaderId: String;
}
