import React, { useEffect, useState } from "react";
import { Box, Typography, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import { toast } from "react-toastify";
import CreateForm from "./CreateForm";
import EditForm from "./EditForm";
import { baseurl } from "./Api";

const ContactTable = () => {
  const [contacts, setContacts] = useState([]); 
  const [data, setData] = useState([]); 
  const [isAscending, setIsAscending] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editFormData, setEditFormData] = useState({});

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    filterContacts();
  }, [searchTerm, isAscending]);

  const fetchContacts = () => {
    fetch(baseurl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((responseData) => {
        const contactArray = responseData.data || [];
        setContacts(contactArray); 
        setData(contactArray); 
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch data!", { toastId: "fetchErrorToast" });
      });
  };

  const filterContacts = () => {
    let filteredData = contacts.filter((contact) =>
      `${contact.firstName} ${contact.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    filteredData = filteredData.sort((a, b) =>
      isAscending
        ? a.firstName.localeCompare(b.firstName)
        : b.firstName.localeCompare(a.firstName)
    );

    setData(filteredData);
  };

  const handleDelete = (contact) => {
    fetch(`${baseurl}/${contact._id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to delete contact");
        fetchContacts(); 
        toast.success("Contact deleted successfully!", { toastId: "deleteToast" });
      })
      .catch((error) => {
        console.error("Error deleting contact:", error);
        toast.error("Failed to delete contact!", { toastId: "deleteErrorToast" });
      });
  };

  const handleCreate = (newData) => {
    fetch(`${baseurl}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to create contact");
        fetchContacts(); 
        setShowCreateForm(false);
        toast.success("Contact created successfully!", { toastId: "createToast" });
      })
      .catch((error) => {
        console.error("Error creating contact:", error);
        toast.error("Error: check if Email/Phone already exists", { toastId: "createErrorToast" });
      });
  };

  const handleSaveEdit = (editedData) => {
    fetch(`${baseurl}/${editedData._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedData),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to update contact");
        fetchContacts(); 
        setShowEditForm(false);
        toast.success("Contact updated successfully!", { toastId: "editToast" });
      })
      .catch((error) => {
        console.error("Error updating contact:", error);
        toast.error("Failed to update contact!", { toastId: "editErrorToast" });
      });
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" color="primary" align="center" gutterBottom>
        Contact Management App
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Search Contacts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flex: 1, marginRight: "10px" }}
        />
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setShowCreateForm(true)}
        >
          Create Contact
        </Button>
        <Button
          variant="contained"
          onClick={() => setIsAscending(!isAscending)}
          sx={{ marginLeft: "10px" }}
        >
          Sort {isAscending ? "⬆ A-Z" : "⬇ Z-A"}
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Job Title</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.firstName}</TableCell>
                <TableCell>{item.lastName}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.phoneNumber}</TableCell>
                <TableCell>{item.company}</TableCell>
                <TableCell>{item.jobTitle}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setEditFormData(item);
                      setShowEditForm(true);
                    }}
                  >
                    <Edit />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(item)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {showCreateForm && (
        <CreateForm
          onClose={() => setShowCreateForm(false)}
          onCreate={handleCreate}
        />
      )}
      {showEditForm && (
        <EditForm
          contactData={editFormData}
          onClose={() => setShowEditForm(false)}
          onSave={handleSaveEdit}
        />
      )}
    </Box>
  );
};

export default ContactTable;
