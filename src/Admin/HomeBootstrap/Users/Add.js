import React, { useState, useEffect } from "react";
import "./Add.css";
import Avatar from "react-avatar-edit";
import axios from "axios";
import swal from "sweetalert";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
var validator = require("email-validator");

const Add = (props) => {
  const [Src, setSrc] = useState(null);
  const [preview, setPreview] = useState(null);
  const [check, setCheck] = useState(false);

  const Close = () => {
    setPreview(null);
  };
  const Crop = (view) => {
    setPreview(view);
  };

  const [addUser, setAdduser] = useState({
    firstname: "",
    lastname: "",
    avatar: "",
    email: "",
    phoneno: "",
    gender: "",
  });

  const handleFirstnameChange = (e) => {
    const { name, value } = e.target;
    document.getElementById("add" + name).style.borderColor = "";
    document.getElementById("add" + name).style.borderWidth = "";
    if (value.length < 15) {
      setAdduser({
        ...addUser,
        [name]: value,
      });
    }
  };

  const handleEmailchange = (e) => {
    const { name, value } = e.target;
    document.getElementById("add" + name).style.borderColor = "";
    document.getElementById("add" + name).style.borderWidth = "";
    if (value.length < 30) {
      setAdduser({
        ...addUser,
        [name]: value,
      });
    }
  };

  const handlePhonechange = (value) => {
    var name = "phoneno";
    document.getElementById("addphoneno").style.borderColor = "";
    document.getElementById("addphoneno").style.borderWidth = "";
    setAdduser({
      ...addUser,
      [name]: value,
    });
  };

  const handleGenderchange = (e) => {
    const { name, value } = e.target;
    setAdduser({
      ...addUser,
      [name]: value,
    });
    document.getElementById("addgender").style.borderColor = "";
    document.getElementById("addgender").style.borderWidth = "";
  };

  const changeOptiontoUser = () => {
    props.option("user");
  };

  const urlToFile = (url, id) => {
    let arr = url.split(",");
    let mime = arr[0].match(/:(.*?);/)[1];
    let data = arr[1];
    let dataStr = atob(data);
    let n = dataStr.length;
    let dataArr = new Uint8Array(n);
    while (n--) {
      dataArr[n] = dataStr.charCodeAt(n);
    }
    let file = new File([dataArr], id + ".png", { type: mime });
    let payload = new FormData();
    payload.append("file", file);
    axios
      .post("http://localhost:9002/Admin/uploadimage", payload, {})
      .then((res) => {
        if (res.body.code != 100) {
          console.log("Not Uploaded Files");
        }
      });
  };
  const changeBordercolorIfempty = (
    firstname,
    lastname,
    email,
    phoneno,
    gender
  ) => {
    if (!firstname) {
      document.getElementById("addfirstname").style.borderColor = "#0010d9";
      document.getElementById("addfirstname").style.borderWidth = "2px";
    }
    if (!lastname) {
      document.getElementById("addlastname").style.borderColor = "#0010d9";
      document.getElementById("addlastname").style.borderWidth = "2px";
    }
    if (!email) {
      document.getElementById("addemail").style.borderColor = "#0010d9";
      document.getElementById("addemail").style.borderWidth = "2px";
    }
    if (!phoneno) {
      document.getElementById("addphoneno").style.borderColor = "#0010d9";
      document.getElementById("addphoneno").style.borderWidth = "2px";
    }
    if (!gender) {
      document.getElementById("addgender").style.borderColor = "#0010d9";
      document.getElementById("addgender").style.borderWidth = "2px";
    }
  };

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

  const addUserbutton = () => {
    const { firstname, lastname, avatar, email, phoneno, gender } = addUser;
    changeBordercolorIfempty(firstname, lastname, email, phoneno, gender);
    if (firstname && lastname && email && phoneno && gender) {
      if (validationOnphoneAndemail(email, phoneno)) {
        axios
          .post("http://localhost:9002/Admin/adduser", {
            firstname: firstname,
            lastname: lastname,
            avatar: preview,
            email: email,
            phoneno: phoneno,
            gender: gender,
          })
          .then((res) => {
            if (res.data.code === 200) {
              if (preview) {
                urlToFile(preview, res.data.message);
              }
              swal("User Added", "User Added Successfully", "success").then(
                (willadd) => {
                  if (willadd) {
                    changeOptiontoUser();
                  }
                }
              );
            } else {
              swal("Error!!!!", "User Not Added ", "error");
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

  return (
    <div class="containeruser">
      <div class="Headinguser">
        <a
          style={{ cursor: "pointer" }}
          onClick={() => {
            changeOptiontoUser();
          }}
        >
          Users
        </a>
        <ArrowForwardIosIcon sx={{fontSize:20}}/>
        {/*<span class="glyphicon glyphicon-menu-right"></span>*/}Add User
      </div>
      <div class="line"></div>
      <div class="row">
        <div class="col-sm-4 columns">
          <div class="uploadpic">
            <label>Upload a Profile Picture</label>
            <Avatar
              width={250}
              height={200}
              onCrop={Crop}
              onClose={Close}
              src={Src}
            />
          </div>
          {preview && <img class="uploadimage" src={preview} />}
        </div>
        <div class="col-sm-4 columns">
          <br />

          <div className="mb-3">
            <label>First Name*</label>
            <input
              id="addfirstname"
              onChange={handleFirstnameChange}
              value={addUser.firstname}
              name="firstname"
              type="email"
              placeholder={"First Name"}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label>Last Name*</label>
            <input
              id="addlastname"
              onChange={handleFirstnameChange}
              value={addUser.lastname}
              name="lastname"
              type="text"
              placeholder={"Last Name"}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label>Email Address*</label>
            <input
              id="addemail"
              value={addUser.email}
              onChange={handleEmailchange}
              name="email"
              type={"text"}
              placeholder={"Email Address"}
              className="form-control"
            />
          </div>
        </div>
        <div class="col-sm-4 columns">
          <div className="mb-3">
            <label>Phone Number*</label>
            <PhoneInput
              id="addphoneno"
              defaultCountry="PK"
              value={addUser.phoneno}
              onChange={handlePhonechange}
              className="phonenumber form-control"
            />
          </div>

          <div className="mb-3">
            <label>Gender*</label>
            <select
              name="gender"
              class="form-control"
              onChange={handleGenderchange}
              value={addUser.gender}
              id="addgender"
            >
              <option value={"Gender"}>Gender</option>
              <option value={"Male"}>Male</option>
              <option value={"Female"}>Female</option>
              <option value={"Other"}>Other</option>
            </select>
          </div>

          <br />

          <button onClick={addUserbutton} className="adduserbtn adduser">
            Add User
          </button>
        </div>
      </div>
    </div>
  );
};

export default Add;
