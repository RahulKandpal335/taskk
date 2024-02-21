// Import the required modules
const express = require("express")
const router = express.Router()

const {coursePagination , createCourse} = require("../Controller/course");

router.get("/getCourse" , coursePagination);
router.post("/createCourse" , createCourse);
 


module.exports = router;