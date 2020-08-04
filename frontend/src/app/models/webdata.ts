export class Webdata {
    constructor(_id="", title="", metaTitle="", metaDescription=""){
        this._id = _id;
        this.title = title;
        this.metaTitle = metaTitle;
        this.metaDescription = metaDescription;
    }

    _id: String;
    title: String;
    metaTitle: String;
    metaDescription: String;
}
