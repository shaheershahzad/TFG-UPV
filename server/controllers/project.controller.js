const projectDAO = require("../DAO/project.dao");

exports.createProject = (req, res, next) => {
    const newProject = {
        name: req.body.name,
        description: req.body.description
    }

    projectDAO.createProject(newProject, (err, project) => {
        
        if(err && err.code == 11000){
            return res.status(409).send("Project name already exists");
        }
        
        if(err){
            return res.status(500).send("Server error");
        }

        const dataProject = {
            name: project.name,
            description: project.description
        }

        //response
        res.send({ dataProject });
    });
}

exports.getProjects = (req, res, next) => {
    const projectData = {
        name: req.body.name
    }

    projectDAO.find((err, project) => {
        if(err){
            return res.status(500).send("Server error");
        }

        if(!project){
            // No projects available
            res.status(409).send("Something is wrong");
        }else{
            const dataProject = {
                name: project.name,
                description: project.description,
            }

            res.send({ dataProject });
        }
    });
}