import React, { useState } from "react";
import "./MaterialloginPage.css";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import Slide from '@mui/material/Slide';
import { width } from "@mui/system";

const Materiallogin = (props) => {
  const navigate = useNavigate();

  const [loginData, setLogindata] = useState({
    username: "",
    password: "",
  });

  const handleLogindataChange = (e) => {
    const { name, value } = e.target;
    if (value.length < 10) {
      setLogindata({
        ...loginData,
        [name]: value,
      });
    }
  };

  const loginNow = () => {
    const { username, password } = loginData;
    if (!username && !password) {
      swal("Empty Fields", "Kindly Enter the UserName and Password Both", "error");
    } else if (!username) {
      swal("Empty Field", "Kindly Enter the UserName", "error");
    } else if (!password) {
      swal("Empty Field", "Kindly Enter the Password", "error");
    } else {
      axios
        .post("http://localhost:9002/Admin//login", {
          username: username,
          password: password,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.code === 200) {
            swal("Login Succcessfully", "", "success").then((willLogin) => {
              if (willLogin) {
                props.redirection(true); 
                navigate("/home");
              }
            });
          } else if (res.data.code === 100) {
            swal("Password Not Correct", "", "error");
          } else {
            swal("Admin User Not Exist with these credentials", "", "error");
            }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
<div class="BodyloginMaterial">
<Slide direction="up" in={"true"}style={{ transformOrigin: '0 0 0' }}
    {...({ timeout: 1000 })}  mountOnEnter unmountOnExit>
    <Box
        sx={{
          boxShadow: 10,
          p: 3,
          m: 15,
          borderRadius: 5,
          bgcolor:"white",
          display:"flex",
          flexDirection: 'column', 
          justifyContent:"center"
        }}
      >
          <img
          src="https://lms.nust.edu.pk/lms/images/logo02.png"
          class="roundedLoginPic"
          alt="..."
           />
           <Box sx={{display:"flex", flexDirection: 'column',  justifyContent:"center"}}>
            <TextField
              onChange={handleLogindataChange}
              value={loginData.username}
              name="username"
              margin="dense"
              sx={{mt:2, width: 300 }}
              id="standard-basic"
              label="User Name"
              variant="standard"
            />
             <TextField
              onChange={handleLogindataChange}
              value={loginData.password}
              name="password"
              margin="dense"
              sx={{mt:2, width: 300}}
              id="standard-basic"
              label="Password"
              type={"password"}
              variant="standard"
            />
             <Button sx={{mt:2, fontSize: 13 }} variant="contained" onClick={loginNow}>
                Login Admin
              </Button>
              </Box>

    </Box>
    </Slide>
    </div>
 );
};



    {/*<div class="Bodylogin">
      <div class="container Cart-Container-login">
        <div class="row d-flex justify-content-right align-items-center">
          <div class="col-12">
            <div class="card Cardlogin">
              <div class="card-body p-5 cardbodylogin">
                <div class="text-center">
                  <img
                    src="https://lms.nust.edu.pk/lms/images/logo02.png"
                    class="rounded"
                    alt="..."
                  />
                </div>
                <form>
                  <br />
                  <div id="loginwarning" class="form-check-label warninglogin">
                    User Name or Password Not Correct
                  </div>

                  <div class="form-outline mb-4">
                    <input
                      onChange={handleLogindataChange}
                      value={loginData.username}
                      name="username"
                      type={"text"}
                      placeholder={"User Name"}
                      id={"username"}
                      class="form-control form-control-lg textbox"
                    />
                  </div>

                  <div class="form-outline mb-4">
                    <input
                      onChange={handleLogindataChange}
                      value={loginData.password}
                      name="password"
                      type={"password"}
                      placeholder={"Password"}
                      id={"username"}
                      class="form-control form-control-lg textbox"
                    />
                  </div>

                  <div class="d-flex justify-content-center">
                    <a
                      onClick={loginNow}
                      class="btn btn-success btn-block btn-lg gradient-custom-4 text-body loginbtn"
                    >
                      Login Admin
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>*/}
 

export default Materiallogin;
