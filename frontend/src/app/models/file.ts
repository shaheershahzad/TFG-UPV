export class FileModel {
    constructor(_id="", name="", uploadedName="", path="", size="", type="", projectId="", uploaderId=""){
        this._id = _id;
        this.name = name;
        this.uploadedName = uploadedName;
        this.path = path;
        this.size = size;
        this.type = type;
        this.projectId = projectId;
        this.uploaderId = uploaderId;
    }

    _id: String;
    name: String;
    uploadedName: String;
    path: String;
    size: String;
    type: String;
    projectId: String;
    uploaderId: String;
}
