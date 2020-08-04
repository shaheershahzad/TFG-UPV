export class Webdata {
    constructor(_id="", title="", metaTitle="", metaDescription=""){
        this._id = _id;
        this.websiteTitle = title;
        this.websiteMetaTitle = metaTitle;
        this.websiteMetaDescription = metaDescription;
    }

    _id: String;
    websiteTitle: String;
    websiteMetaTitle: String;
    websiteMetaDescription: String;
}
