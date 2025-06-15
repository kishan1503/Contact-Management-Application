import express from "express";
import { createContact, deleteContact, getContacts, updateContact } from "../controllers/contact.controller.js";



const router = express.Router();

router.post("/" , createContact);
router.get("/",getContacts);
router.put("/:id", updateContact);
router.delete("/:id" , deleteContact);

export default router;