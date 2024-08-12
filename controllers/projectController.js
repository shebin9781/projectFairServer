const projects = require("../Models/projectmodel");


//addproject



exports.addProject = async (req,res)=>{
    console.log("inside add project request"); 
   console.log(req.payload)
   console.log(req.body);
   console.log(req.file);
   const {title,language,overview,github,website} = req.body
   const userId =req.payload
   const projectImage = req.file.filename

   try {
    const exisitingProject = await projects.findOne({github})
    if(exisitingProject){
        res.status(406).json("Project Already In Our System, Kindly Upload Anthor !!!!")
    }
    else{
        const newProject = new projects({
            title,language,overview,github,website,projectImage,userId
        })
        await newProject.save()
        res.status(200).json(newProject)
    }
    
   } catch (err) {
    res.status(401).json(err)
   }
}


//get all projects
exports.getAllProject = async (req,res)=>{
    const searchKey = req.query.search
    const query = {
        language : {
            $regex: searchKey, $options: 'i'
        }
    }  
    try{
        const allProject = await projects.find(query)
        res.status(200).json(allProject)
    }catch(err){
        res.status(401).json(err)
    }
}


//get userprojects

exports.getUserProjects  = async (req,res)=>{
    const userId = req.payload
    try{
        const userProjects = await projects.find({userId})
        res.status(200).json(userProjects)
    }catch(err){
        res.status(401).json(err)
    }
}

//get home projects

exports.getHomeProject = async (req,res)=>{
    try {
        const homeProject = await projects.find().limit(3)
        res.status(200).json(homeProject)
    } catch (err) {
        res.status(401).json(err)
    }
}

//edit project 

exports. editProject = async (req,res)=>{
    console.log("inside edit project");
    const {pid} = req.params
    const userId = req.payload
    const {title,language,overview,github,website,projectImage} = req.body
    const uploadImage = req.file?req.file.filename:projectImage
    try {
       const updateProject = await projects.findByIdAndUpdate({_id:pid},{title,language,overview,github,website,projectImage:uploadImage,userId},{new:true}) 
       await updateProject.save()
       res.status(200).json(updateProject)
    } catch (err) {
        res.status(401).json(err)
    }
}

//remove

exports.removeProject = async (req,res)=>{
    console.log("inside remove project");
    const {pid} = req.params
    try {
        const projectDetails = await projects.findByIdAndDelete({_id:pid})
        res.status(200).json(projectDetails)
    } catch (err) {
        res.status(401).json(err)
    }    
}