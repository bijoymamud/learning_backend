const prisma = require("../config/prisma");

//creating company
const createCompany = async(req, res) => {
    try {
        const {company_name,slogan, company_location, type, number_of_employees, about, website_url, logo } = req.body

        const company_info = await prisma.company.create({
            data:{
                company_name,
                slogan,
                company_location,
                type,
                number_of_employees,
                about,
                website_url,
                logo
            }
        })
        
        return res.status(201).json({data: company_info,message:" successfully create the Company "});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Failed to create company"});
    }
}

//getting all company
    const getAllCompany = async(req, res) =>{
        try {
            const companies = await prisma.company.findMany()
            return res.status(200).json({
                message:"Successfully get all company",
                data: companies
            })
        } catch (error) {
            console.log(error);
            res.status(500).json(
                {message:"Failed to get company"}
            );
        }
    }

//delete company
const deleteCompany  = async (req,res) => {
    try {
        const {id} = req.params
        if(!id){
            return res.status(400).json({message: "Company Id not found"});
        }
        const company_id = Number(id);
        const company_info = await prisma.company.findUnique({where: {id:company_id}});
       if (!company_info) {
         return res.status(400).json({message: "Company not found"});
       }
        await prisma.company.delete({where: {id:company_id}});
        return res.status(200).json({message: "Company Deleted Successfully"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Failed to delete company"});
    }
}

//edit company
const editCompany = async (req, res) => {
    try {
        const {id} = req.params
        if (!id) {
            return res.status(404).json({message: "Comapany id not found"})
        }
        const companyId = Number(id); 
        const company_info  = await prisma.company.findUnique({where: {id: companyId}})
        if (!company_info) {
            return res.status(404).json({message: "Company Details not found"})
        }

        const updatedCompanyData = await prisma.company.update({
            where: {id:companyId},
            data: req.body
        })
        return res.status(200).json({
            message: "Company updated successfully",
            data: updatedCompanyData
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to edit company"
        })
        
    }
}

module.exports = {
    createCompany,
    getAllCompany,
    deleteCompany,
    editCompany
}