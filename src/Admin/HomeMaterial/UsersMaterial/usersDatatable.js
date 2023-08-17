import React, { useState, useEffect } from "react";
import "./usersDatatable.css";
import axios from "axios";
import swal from "sweetalert";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import DataTable from "react-data-table-component";
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Box, Button } from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import Slide from '@mui/material/Slide';

const Datatable = (props) => {
  const [State, setstate] = useState({
    usersData: [],
  });

  const [activeCheckbox, setActiveCheckbox] = useState([]);
  const [open, setOpen] = React.useState(true);
  const [removeBtn,setremoveBtn]= useState(true);
  const updateState = (state) => {
    if (state.selectedRows.length != 0) {
      setremoveBtn(false);
    } else {
      setremoveBtn(true);
    }
    setActiveCheckbox(state.selectedRows);
  };

  const avatarURL = (avatarURL, avatarGender) => {
    if (avatarURL) {
      return avatarURL;
    } else if (avatarGender === "Female") {
      return "https://www.pngarts.com/files/11/Avatar-PNG-High-Quality-Image.png";
    } else {
      return "https://cdn1.iconfinder.com/data/icons/website-internet/48/website_-_male_user-512.png";
    }
  };

  const removeMultipleuser = () => {
    swal({
      title: "Are you sure to delete all selected User's?",
      text: "",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        activeCheckbox.map((num) => {
          removeSingleuser(num.ID);
        });
        setActiveCheckbox([]);
        setremoveBtn(true);
      }
    });
  };

  const removeSingleuser = (id) => {
    axios
      .post("http://localhost:9002/Admin/deleteuser", {
        id: id,
      })
      .then((res) => {
        if (res.data.code === 200) {
          getDatafromServer();
          swal("Deleted", "User deleted from Database", "success");
        } else {
          swal("Error", "There is Some error during deletion", "error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeUser = (id) => {
    swal({
      title: "Are you sure to delete?",
      text: "",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        removeSingleuser(id);
      }
    });
  };

  const redirectToeditUser = (id) => {
    props.setid(id);
    props.option("edituser");
  };

  const getDatafromServer = () => {
    axios
      .post("http://localhost:9002/Admin/getAlluserData")
      .then((res) => {
        setstate((prevState) => ({
          ...prevState,
          usersData: res.data,
        }));
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    //document.getElementById("removeuserbtn").disabled = true;
    getDatafromServer();
  }, []);

  const columns = [
    {
      name: "Avatar",
      selector: (row) => (
        <img
          style={{width:50,height:50}}
          src={avatarURL(row.avatar, row.gender)}
        />
      ),
    },
    {
      name: "First Name",
      selector: (row) => row.firstname,
    },
    {
      name: "Last Name",
      selector: (row) => row.lastname,
    },
    {
      name: "Email Address",
      selector: (row) => row.email,
    },
    {
      name: "Phone Number",
      selector: (row) => row.phoneno,
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <a style={{ cursor: "pointer" }}>
            {" "}
            <span
              class="glyphicon glyphicon-trash"
              onClick={() => {
                removeUser(row.ID);
              }}
            ></span>
          </a>
          <a style={{ cursor: "pointer", marginLeft: "10px" }}>
            <span
              class="glyphicon glyphicon-edit"
              onClick={() => {
                redirectToeditUser(row.ID);
              }}
            ></span>
          </a>
        </>
      ),
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: "72px", // override the row height
      },
    },
    headCells: {
      style: {
        backgroundColor: "#0000b3",
        color: "white",
        paddingLeft: "1px", // override the cell padding for head cells
        paddingRight: "1px",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
      },
    },
  };

  return (
    <>
      <Slide direction="up" in={"true"} style={{ transformOrigin: '0 0 0' }}
    {...({ timeout: 1000 })} mountOnEnter unmountOnExit>
      <Box>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        
        <Typography variant="h4" component="h4" mt={3} sx={{color:"#0000b3"}}>
          Users
        </Typography>
        <Divider color={"blue"} sx={{marginTop:2}}/>
        
          
        <Box sx={{display:"flex",justifyContent:"right"}}>
        <Button sx={{m:2,fontSize:13,backgroundColor:"#0010d9" }} onClick={() => { props.option("adduser"); }}  variant="contained" startIcon={<PersonAddIcon />}>Add User</Button>
        <Button disabled={removeBtn} sx={{m:2,fontSize:13,backgroundColor:"#0010d9" }} onClick={removeMultipleuser}  variant="contained" startIcon={<DeleteIcon />}>Remove User</Button>
        </Box>
         <DataTable
            className="table"
            columns={columns}
            data={State.usersData}
            pagination
            fixedHeader
            paginationRowsPerPageOptions={[5, 15, 50, 100]}
            selectableRows
            selectableRowsHighlight
            highlightOnHover
            responsive
            customStyles={customStyles}
            onSelectedRowsChange={updateState}
          />
          </Box>
          </Slide>
    </>
  );
};

export default Datatable;
