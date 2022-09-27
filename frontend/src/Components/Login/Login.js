import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import swal from "sweetalert";
import Box from "@mui/material/Box";
import Footer from "../footer/footer";
function Login() {
  const navigation = new useNavigate();
  const [userName, updateUserName] = useState("");
  const [password, updatePassword] = useState("");
  const registerUser = () => {
    navigation("/Register");
  };
  const onLogin = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:8082/api/v1/login", { userName, password })
      .then((resp) => {
        swal("LogIn", "Succesfully Logged In!", "success");
        if (resp.data.role == "customer")
          navigation(`/CustomerDashboard/${userName}`);
        if (resp.data.role == "admin")
          navigation(`/AdminDashboard/${userName}`);
        if (resp.data.role == "employee")
          navigation(`/EmployeeDashboard/${userName}`);
        if (resp.data.role == "agent")
          navigation(`/AgentDashboard/${userName}`);
      })
      .catch((error) => {
        swal(error.response.data, "You Can't LogIn", "warning");
      });
  };
  return (
    <>
      <div className="limiter1">
        <div className="container-login1001">
          <div className="wrap-login1001">
            <form className="login100-form1 validate-form">
              <span className="login100-form-title1 p-b-48">
                <i className="zmdi zmdi-font" style={{ color: "#AE2CFF" }}>
                  E-Insurance
                </i>
              </span>
              <br></br>
              <span
                className="login100-form-title1"
                style={{ color: "#27CCFD" }}
              >
                Login
              </span>

              <br></br>
              <Box
                // component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "30ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="standard-basic"
                  label="Username"
                  variant="standard"
                  onChange={(e) => updateUserName(e.target.value)}
                />
              </Box>
              <Box
                // component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "30ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="standard-basic"
                  label="Password"
                  variant="standard"
                  onChange={(e) => updatePassword(e.target.value)}
                />
              </Box>
              <br />

              <div className="container-login100-form-btn1">
                <div className="wrap-login100-form-btn1">
                  <div className="login100-form-bgbtn1"></div>
                  <button
                    className="login100-form-btn1"
                    onClick={onLogin}
                    style={{ width: "100%" }}
                  >
                    Login
                  </button>
                </div>
              </div>

              <div>
                <br></br>
                <br></br>
                <span className="txt1">Don’t have an account?</span>

                <a
                  className="txt2"
                  style={{ onHover: { cursor: "pointer" } }}
                  onClick={registerUser}
                >
                  Sign Up
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
