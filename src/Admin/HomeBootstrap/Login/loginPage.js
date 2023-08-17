import React, { useState } from "react";
import "./loginPage.css";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
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
      swal("Empty Fields", "Kindly Enter the Email and Password Both", "error");
    } else if (!username) {
      swal("Empty Field", "Kindly Enter the Email", "error");
    } else if (!password) {
      swal("Empty Field", "Kindly Enter the Email", "error");
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
            document.getElementById("loginwarning").innerText =
              "Password Not Correct";
            document.getElementById("loginwarning").style.display = "inline";
          } else {
            document.getElementById("loginwarning").innerText =
              "Admin User Not Exist with these credentials";
            document.getElementById("loginwarning").style.display = "inline";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div class="Bodylogin">
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
    </div>
  );
};

export default Login;
