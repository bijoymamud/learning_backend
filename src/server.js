const express = require("express");
const dotenv = require("dotenv");
const taskRoutes = require("./routes/task.routes");
const companyRoutes = require("./routes/company.routes");

dotenv.config();
const app = express();


app.use(express.json());

app.use("/task", taskRoutes)
app.use("/company", companyRoutes)

app.get("/",(req,res)=>{
    res.send("POSTGRES IS CONNECTED");
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});