import React, { useState, useEffect } from "react";
import "./Edit.css";
import Avatar from "react-avatar-edit";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import PhoneInput from 'react-phone-number-input'
import "react-phone-number-input/style.css"
import swal from "sweetalert";
var validator = require("email-validator");

const Edit = (props) => {

  const [Src, setSrc] = useState(null);
  const [preview, setPreview] = useState(null);
  const [check, setCheck] = useState(true);
  const [change, setChange] = useState(false);
  const [Loading, setLoading] = React.useState(true);

  const [editUser, setEdituser] = useState({
    firstname: "",
    lastname: "",
    avatar: "",
    email: "",
    phoneno: "",
    gender: "",
  });
  const Close = () => {
    setPreview(null);
    const { firstname, lastname, avatar, email, phoneno, gender } = editUser;
    setEdituser({
      firstname: firstname,
      lastname: lastname,
      avatar: "",
      email: email,
      phoneno: phoneno,
      gender: gender,
    });
    setChange(true);
  };
  const Crop = (view) => {
    setPreview(view);
    const { firstname, lastname, avatar, email, phoneno, gender } = editUser;
    setEdituser({
      firstname: firstname,
      lastname: lastname,
      avatar: view,
      email: email,
      phoneno: phoneno,
      gender: gender,
    });
    setChange(true);
  };

  const loadData = () => {
    const id = props.ID;
    axios
      .post("http://localhost:9002/Admin/findUserbyID", {
        id,
        id,
      })
      .then((res) => {
        const { firstname, lastname, avatar, email, phoneno, gender } =
          res.data;
        setEdituser({
          firstname: firstname,
          lastname: lastname,
          avatar: avatar,
          email: email,
          phoneno: phoneno,
          gender: gender,
        });
        setPreview(res.data.avatar);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleNameschange = (e) => {
    const { name, value } = e.target;
    document.getElementById("edit"+name).style.borderColor = "";
    document.getElementById("edit"+name).style.borderWidth = "";
    if (value.length < 15) {
      setEdituser({
        ...editUser,
        [name]: value,
      });
      setChange(true);
    }
  };

  const handleEmailchange = (e) => {
    const { name, value } = e.target;
    document.getElementById("edit"+name).style.borderColor = "";
    document.getElementById("edit"+name).style.borderWidth = "";
    if (value.length < 30) {
      setEdituser({
        ...editUser,
        [name]: value,
      });
      setChange(true);
    }
  };


  const handlePhoneChange = (e) => {
    var value = e;
    var name="phoneno";
    document.getElementById("editphoneno").style.borderColor =  "";
    document.getElementById("editphoneno").style.borderWidth = "";
        setEdituser({
          ...editUser,
          [name]: value,
        });
        setChange(true);
    };

  const handleGenderchange = (e) => {
    const { name, value } = e.target;
    setEdituser({
      ...editUser,
      [name]: value,
    });
    setChange(true);
  };

  const changeOptiontoUser = () => {
    props.option("user");
  };
  const changeBordercolorIfempty = (
    firstname,
    lastname,
    email,
    phoneno,
    gender
  ) => {
  if (!firstname) {
    document.getElementById("editfirstname").style.borderColor = "#0010d9";
    document.getElementById("editfirstname").style.borderWidth = "2px";
  }
  if (!lastname) {
    document.getElementById("editlastname").style.borderColor = "#0010d9";
    document.getElementById("editlastname").style.borderWidth = "2px";
  }
  if (!email || !check) {
    document.getElementById("editemail").style.borderColor = "#0010d9";
    document.getElementById("editemail").style.borderWidth = "2px";
  }
  if (!phoneno) {
    document.getElementById("editphoneno").style.borderColor = "#0010d9";
    document.getElementById("editphoneno").style.borderWidth = "2px";
  }
  if (!gender) {
    document.getElementById("editgender").style.borderColor = "#0010d9";
    document.getElementById("editgender").style.borderWidth = "2px";
  }
}

const validationOnphoneAndemail = (email, phoneno) => {
  const boolOftruthness = true;
  if (!validator.validate(email)) {
    swal("Email Error", "Email Format is Not Correct", "error");
    boolOftruthness = false;
  }
  if (phoneno.length > 14) {
    swal(
      "Phone Number",
      "Phone Number Must have digits Smaller than 14",
      "error"
    );
    boolOftruthness = false;
  }
  return boolOftruthness;
};

  const edituserbutton = () => {
    const { firstname, lastname, avatar, email, phoneno, gender } = editUser;
    if (!change) {changeOptiontoUser();}
    changeBordercolorIfempty(firstname, lastname, email, phoneno, gender);
   if (
      firstname &&
      lastname &&
      email &&
      phoneno &&
      gender
    ) {
      if (validationOnphoneAndemail(email, phoneno)) {
       axios
          .post("http://localhost:9002/Admin/editUser", {
            id: props.ID,
            firstname: firstname,
            lastname: lastname,
            avatar: avatar,
            email: email,
            phoneno: phoneno,
            gender: gender,
          })
          .then((res) => {
            if (res.data.code === 200) {
              swal("Successfully Edited", "User Edited Successfully", "success").then((willDelete) => {
                if (willDelete) {
                  changeOptiontoUser();
                }
              });
            } else if (res.data.code === 100) {
              swal("Error!!!!", "User Not Edited ", "error");
            }
          })
          .catch((err) => {
            console.log(err);
          });
        }
    } else {
      swal(
        "Empty Fields",
        "Kindly, Fill All the highlighted fields Correctly",
        "error"
      );
    }
  };
  
  useEffect(()=>{
    loadData();
  },[]);

  return (
    <div class="containerEdituser">
      <div class="Headinguser">
      <a style={{ cursor: "pointer" }} onClick={()=>{changeOptiontoUser()}}>Users</a>
         <span class="glyphicon glyphicon-menu-right"></span> Edit User
      </div>
      <div class="line"></div>
      <div class="row">
        <div class="col-sm-4 columns">
          <div class="uploadEditpic">
            <label>Upload a Profile Picture</label>
            <Avatar
              width={250}
              height={200}
              onCrop={Crop}
              onClose={Close}
              src={Src}
            />
          </div>
          {preview && <img class="uploadEditimage" src={editUser.avatar} />}
        </div>
        <div class="col-sm-4 columns">
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            Loading={Loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
        <div class="col-sm-4 columns">
          <br />

          <div className="mb-3">
            <label>First Name*</label>
            <input
              id="editfirstname"
              onChange={handleNameschange}
              value={editUser.firstname}
              name="firstname"
              type="text"
              placeholder={"First Name"}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label>Last Name*</label>
            <input
              id="editlastname"
              onChange={handleNameschange}
              value={editUser.lastname}
              name="lastname"
              type="text"
              placeholder={"Last Name"}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label>Email Address*</label>
            <input
              value={editUser.email}
              onChange={handleEmailchange}
              name="email"
              type={"email"}
              placeholder={"Email Address"}
              id="editemail"
              className="form-control"
            />
          </div>
        </div>
        <div class="col-sm-4 columns">
          <div className="mb-3">
           <label>Phone Number*</label>
           <PhoneInput
            id="editphoneno"
            defaultCountry="RU"
            value={editUser.phoneno}
            onChange={handlePhoneChange}
            className="phonenumber form-control"/>     
             </div>

          <div className="mb-3">
            <label>Gender*</label>
            <select
              name="gender"
              id="editgender"
              class="form-control"
              value={editUser.gender}
              onChange={handleGenderchange}
            >
              <option value={"Male"}>Male</option>
              <option value={"Female"}>Female</option>
              <option value={"Other"}>Other</option>
            </select>
          </div>

          <br />

          <button
            onClick={edituserbutton}
            type="submit"
            className="edituserbtn adduser"
          >
            Edit User
          </button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
