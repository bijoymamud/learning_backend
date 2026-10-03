const express = require("express");
const {createCompany,getAllCompany,deleteCompany, editCompany} = require("../controllers/company.controller");

const router = express.Router();

router.get("/",getAllCompany);
router.post("/create_company",createCompany);
router.delete("/:id",deleteCompany);
router.patch("/:id",editCompany);

module.exports = router;