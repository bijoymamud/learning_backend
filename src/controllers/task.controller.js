const prisma = require("../config/prisma");

const createTask = async (req, res) => {
    try {
        const {title, description} = req.body;

        const task = await prisma.task.create({
            data: {
                title,
                description,
            },
        });

        res.status(201).json({data: task,message:"Task created successfully"});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Faild to create task"});
    }
}

const getTask = async (req, res) => {
   try {
    const tasks = await prisma.task.findMany();
   return res.status(200).json({
        message: "Successfully get all task",
        data: tasks
   })

   } catch (error) {
        console.log(error)
       return res.status(500).json({message: "Failed to get tasks"})
   }
}


module.exports = {
createTask,
getTask,
}