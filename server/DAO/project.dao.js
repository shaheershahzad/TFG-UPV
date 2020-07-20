/*const mongoose = require("mongoose");
const projectSchema = require("../models/project.model");

projectSchema.statics = {
    createProject: function(data, callback){
        const project = new this(data);
        project.save(callback);
    },
    getProjects: function(query, callback){
        this.find(query, callback);
    }
}

const projectModel = mongoose.model("Projects", projectSchema);
module.exports = projectModel;*/