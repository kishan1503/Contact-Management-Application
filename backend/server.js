import express from "express";
import dotenv from 'dotenv';
import { ConnectDb } from "./config/db.js";
import cors from "cors";
import contactRoutes from "./routes/contact.route.js"
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("Server is running ")
});

app.use("/contacts",contactRoutes);

app.listen(port, ()=>{
    ConnectDb();
    console.log(`Server is running on port ${port} and url : http://localhost:${port}/`);
});



