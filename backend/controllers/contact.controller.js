import mongoose from "mongoose";
import Contact from "../models/contact.model.js";

export const createContact = async (req,res)=>{
    const data = req.body;
    console.log(data);
    if(!data.firstName || !data.lastName || !data.email || !data.phoneNumber || !data.company || !data.jobTitle ){
        return res.status(400).json({success : false , message : "Please provide all the fields"});
    }
    const newContact  = new Contact(data);
    try {
        await newContact.save();
        res.status(201).json({success:true , data: newContact});
    } catch (error) {
        console.log("Error in creating new product",error.message);
        res.status(500).json({success:false, message:error.message});
    }
};

export const getContacts = async(req,res)=>{
    try {
        const contacts = await Contact.find({});
        res.status(200).json({success:true , data:contacts});
    } catch (error) {
        res.status(500).json({success:false, message:"Server Error"});
    }
};

export const updateContact = async(req,res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success : false, message : "Invalid Contact Id"});
    }
    const contact = req.body;
    try {
         await Contact.findByIdAndUpdate(id , contact);
        res.status(200).json({success : true, message : "contact has been updated"});
    } catch (error) {
        console.log("ERROR", error.message);
        res.status(500).json({success:false, message:"Server ERROR "});
    }
};

export const deleteContact = async(req,res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success : false, message : "Invalid Contact Id"});
    }
    try {
         await Contact.findByIdAndDelete(id);
        res.status(200).json({success : true, message : "contact has been deleted"});
    } catch (error) {
        console.log("ERROR", error.message);
        res.status(500).json({success:false, message:"Server ERROR "});
    }
};

