import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeComponent from "./Admin/HomeMaterial/HomeComponent";
import MaterialAdminlogin from "./Admin/HomeMaterial/LoginMaterial/MaterialloginPage"
const App = () => {
  const [redirect,setRedirect]= useState(false)//this State will check that User Login or just try to access Home Page
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<MaterialAdminlogin redirection={setRedirect}/>} />
        <Route path="/" element={<MaterialAdminlogin redirection={setRedirect}/>} />
        <Route path="/home" element={redirect ? <HomeComponent /> : <MaterialAdminlogin redirection={setRedirect}/>} />
        {/*<Route path="/home" element={ redirect ? <AdminHome /> : <AdminLogin redirection={setRedirect}/>} />*/}
      </Routes>
    </Router>
  );
};

export default App;
