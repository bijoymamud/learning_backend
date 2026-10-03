const express = require("express");
const{createTask} = require("../controllers/task.controller");

const router = express.Router();


router.post("/create_task",createTask);

module.exports = router;
