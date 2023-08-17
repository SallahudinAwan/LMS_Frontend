import React, { useState } from "react";
import "./homePage.css";
import { Link } from "react-router-dom";
import Adduser from "../Users/Add";
import Edituser from "../Users/Edit";
import UsersDatatable from "./usersDatatable";

const Home = () => {

  const [Option, setOption] = useState("user");
  const [editId, setEditId] = useState("");
  const componentSelection = () => {
    if (Option === "user") {
      return <UsersDatatable setid={setEditId} option={setOption} />;
    } else if (Option === "adduser") {
      return <Adduser option={setOption} />;
    } else if (Option === "edituser") {
      return <Edituser ID={editId} option={setOption} />;
    }
  };

  return (
    <div>
      <div class="sidebar">
        <img
          src="https://lms.nust.edu.pk/lms/images/logo02.png"
          class="homelogo"
          alt="..."
        />
        <a
          class={Option ? "btnactive" : ""}
          onClick={() => {
            setOption("user");
          }}
          id="user"
          href="#"
        >
          Users
        </a>
        <Link to="/login">Logout</Link>
      </div>

      <div class="header">
        <div class="dropdown">
          <button class="avatarbtn" type="button" data-toggle="dropdown">
            <img
              class="avatar avatar-128 bg-light rounded-circle text-white p-2"
              src="https://www.pngarts.com/files/11/Avatar-PNG-Picture.png"
            />
            <span class="caret"></span>
          </button>
          <ul class="dropdown-menu">
            <li>
              <Link to="#">Edit Profile</Link>
            </li>
            <li>
              <Link to="/login">Logout</Link>
            </li>
          </ul>
        </div>
      </div>

      <div class="content">{componentSelection()}</div>
    </div>
  );
};

export default Home;
