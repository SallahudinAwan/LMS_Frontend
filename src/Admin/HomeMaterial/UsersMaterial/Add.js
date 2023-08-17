import React, { useState, useEffect } from "react";
import "./Add.css";
import Avatar from "react-avatar-edit";
import axios from "axios";
import swal from "sweetalert";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import {
  Backdrop,
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
var validator = require("email-validator");

const Add = (props) => {
  const [Src, setSrc] = useState(null);
  const [preview, setPreview] = useState(null);
  const [check, setCheck] = useState(false);
  const [change, setChange] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [picCrop, setpicCrop] = useState(false);
  const [firstnameError,setfirstnameError]= useState(false);
  const [lastnameError,setlastnameError]= useState(false);
  const [emailError,setemailError]= useState(false);
  const [phoneNumberError,setphoneNumberError]= useState(false);
  const [genderError,setgenderError]= useState(false);
  

  const [User, setUser] = useState({
    firstname: "",
    lastname: "",
    avatar: "",
    email: "",
    phoneno: "",
    gender: "",
  });

  const Close = () => {
    setPreview(null);
    const { firstname, lastname, avatar, email, phoneno, gender } = User;
    setUser({
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
    const { firstname, lastname, avatar, email, phoneno, gender } = User;
    setUser({
      firstname: firstname,
      lastname: lastname,
      avatar: view,
      email: email,
      phoneno: phoneno,
      gender: gender,
    });
    setpicCrop(true);
    setChange(true);
  };

  const loadData = () => {
    const id = props.ID;
    axios
      .post("http://localhost:9002/Admin/findUserbyID", {
        id: id,
      })
      .then((res) => {
        const { firstname, lastname, avatar, email, phoneno, gender } =
          res.data;
        setUser({
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

  const handleFirstnameChange = (e) => {
    const { name, value } = e.target;
    if(name==="firstname"){
    setfirstnameError(false)
    }else{
      setlastnameError(false);
    }
    if (value.length < 15) {
      setUser({
        ...User,
        [name]: value,
      });
    }
    setChange(true);
  };

  const handleEmailchange = (e) => {
    const { name, value } = e.target;
    setemailError(false);
    if (value.length < 30) {
      setUser({
        ...User,
        [name]: value,
      });
    }
    setChange(true);
  };

  const handlePhonechange = (value) => {
    var name = "phoneno";
    document.getElementById("addphoneno").style.borderColor = "";
      document.getElementById("addphoneno").style.borderWidth = "";
    setUser({
      ...User,
      [name]: value,
    });
    setChange(true);
  };

  const handleGenderchange = (e) => {
    const { name, value } = e.target;
    var name1="gender"
    console.log(e.target);
    setgenderError(false);
    setUser({
      ...User,
      [name1]: value,
    });
    setChange(true);
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
    setfirstnameError(true)
    }
    if (!lastname) {
      setlastnameError(true);
     }
    if (!email) {
      setemailError(true);
     }
    if (!phoneno) {
      document.getElementById("addphoneno").style.borderColor = "red";
      document.getElementById("addphoneno").style.borderWidth = "2px";
     }
    if (!gender) {
      setgenderError(true);
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
    const { firstname, lastname, avatar, email, phoneno, gender } = User;
    if (props.name === "Edit" && !change) {
      changeOptiontoUser();
    }else{
    changeBordercolorIfempty(firstname, lastname, email, phoneno, gender);
    if (firstname && lastname && email && phoneno && gender) {
      if (validationOnphoneAndemail(email, phoneno)) {
        var pre = preview;
        if (props.name === "Edit" && !picCrop) {
          pre = preview;
        }
        var axiosURL = "http://localhost:9002/Admin/" + props.name + "user";
        axios
          .post(axiosURL, {
            id: props.ID,
            firstname: firstname,
            lastname: lastname,
            avatar: pre,
            email: email,
            phoneno: phoneno,
            gender: gender,
          })
          .then((res) => {
            if (res.data.code === 200) {
              if (pre) {
                urlToFile(pre, res.data.message);
              }
              swal(
                "User " + props.name + "ed",
                "User" + props.name + "ed" + "Successfully",
                "success"
              ).then((willadd) => {
                if (willadd) {
                  changeOptiontoUser();
                }
              });
            } else {
              swal("Error!!!!", "User  Not " + props.name + "ed", "error");
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
  }
};
  useEffect(() => {
    if (props.name === "Edit") {
      loadData();
    }
  }, []);
  return (
    <>
      <Box>
        <Typography
          variant="h4"
          component="h4"
          mt={3}
          sx={{ color: "#0000b3" }}
        >
          {props.name} Users
        </Typography>
        <Divider color={"blue"} sx={{ marginTop: 2 }} />
        <Box component="div" mt={7} sx={{ display: "flex" }}>
          <Box component="div" ml={4} sx={{ display: "inline" }}>
            <Typography variant="h5" component="h5" sx={{ color: "#0000b3" }}>
              Profile Picture
            </Typography>
            <Avatar width={250} height={200} onCrop={Crop} onClose={Close} />
            {preview && (
              <img
                style={{
                  width: 100,
                  height: 100,
                  marginLeft: 70,
                  marginTop: 20,
                }}
                src={preview}
              />
            )}
            {props.name==="Edit" ?
            (<><div class="col-sm-4 columns">
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            Loading={Loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div></>):""
          }

          </Box>
          <Box component="div" ml={3} sx={{ display: "inline" }}>
            <TextField
              size="medium"
              onChange={handleFirstnameChange}
              error={firstnameError}
              value={User.firstname}
              name="firstname"
              margin="dense"
              sx={{ ml: 2, width: 300 }}
              id="standard-basic"
              label="First Name"
              variant="standard"
            />
            <TextField
              onChange={handleFirstnameChange}
              value={User.lastname}
              error={lastnameError}
              name="lastname"
              margin="dense"
              sx={{ ml: 2, width: 300 }}
              id="standard-basic"
              label="Last Name"
              variant="standard"
            />
            <TextField
              error={emailError}
              sx={{ ml: 2, width: 300 }}             
              id="standard-basic"
              value={User.email}
              onChange={handleEmailchange}
              name="email"
              label="Email Address"
              margin="dense"
              variant="standard"
            />
            <FormControl variant="standard" sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Gender
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={User.gender}
                onChange={handleGenderchange}
                label="Gender"
                error={genderError}
              >
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
              </Select>
            </FormControl>

            <Box sx={{marginTop: 2,marginLeft:2}}>
            <Typography 
               variant="string" component={"string"}>Phone Number</Typography>
             <PhoneInput
              id="addphoneno"
              defaultCountry="PK"
              style={{width: 300}}
              value={User.phoneno}
              onChange={handlePhonechange}
              className="phonenumber form-control"
            />
            </Box>

            <Box sx={{marginTop:2, display: "flex", justifyContent: "left" }}>
              <Button sx={{ ml: 2, fontSize: 13,backgroundColor:"#0010d9" }} variant="contained" onClick={addUserbutton}>
                Add User
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

{
  /*
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
        {props.name} User
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
        
        {props.name==="Edit" ?
          (<><div class="col-sm-4 columns">
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            Loading={Loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div></>):""
          }
        
          <div class="col-sm-4 columns">
          <br />

          <div className="mb-3">
            <label>First Name*</label>
            <input
              id="addfirstname"
              onChange={handleFirstnameChange}
              value={User.firstname}
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
              value={User.lastname}
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
              value={User.email}
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
              value={User.phoneno}
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
              value={User.gender}
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
            {props.name} User
          </button>
        </div>
      </div>
        </div>*/
}

export default Add;
