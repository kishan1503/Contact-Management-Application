import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    minlength: [2, "First name must be at least 2 characters long"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    minlength: [2, "Last name must be at least 2 characters long"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address",
    ],
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
    unique: true,
    match: [
      /^[0-9]{10}$/,
      "Phone number must be a valid 10-digit number",
    ], 
  },
  company: {
    type: String,
    required: [true, "Company is required"],
  },
  jobTitle: {
    type: String,
    required: [true, "Job title is required"],
  },
});

const Contact = mongoose.model("Contact", ContactSchema);
export default Contact;
