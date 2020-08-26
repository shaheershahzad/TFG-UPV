export class Donation {
    _id: String;
    donerId: String;
    amount: Number;
    projectId: String;
    paymentMethod: String;
    paymentDate: String;

    constructor(_id="", donerId="", amount=0, projectId="", paymentMethod="", paymentDate=""){
        this._id = _id;
        this.donerId = donerId;
        this.amount = amount;
        this.projectId = projectId;
        this.paymentMethod = paymentMethod;
        this.paymentDate = paymentDate;
    }
}
