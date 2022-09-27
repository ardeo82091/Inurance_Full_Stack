import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import NavBar from "../EmployeeNavBar/EmployeeNavBar";
import axios from "axios";
import swal from "sweetalert";
import IsValidUser from "../isValidUser/isValidUser";
import isEmployeeLoggedIn from "../isEmployeeLoggedIn/isEmployeeLoggedIn";

import isAdminLoggedIn from "../isAdminLoggedIn/isAdminLoggedIn";
function ChangePassword() {
  const currentUser = useParams();
  const [oldPassword, updateOldPassword] = useState();
  const [newPassword, updateNewPassword] = useState();
  const [confirmPassword, updateConfirmPassword] = useState();
  const [isLoggedIn, updateIsLoggedIn] = useState();
  useEffect(() => {
    isLoggedIn();
    async function isLoggedIn() {
      updateIsLoggedIn(
        (await isAdminLoggedIn(currentUser.username)) ||
          (await isEmployeeLoggedIn(currentUser.username))
      );
      console.log(isLoggedIn);
    }
  }, []);

  if (!isLoggedIn) {
    return <IsValidUser />;
  }
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      swal({
        title: "Are you sure?",
        text: "Click OK for Changing Password",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (AddingCity) => {
        if (AddingCity === true) {
          const employetoUpdate = currentUser.username;
          const propertyToUpdate = "Password";
          const value = newPassword;
          await axios
            .put(
              `http://localhost:8082/api/v1/updateEmployee/${currentUser.username}`,
              {
                employetoUpdate,
                propertyToUpdate,
                value,
              }
            )
            .then((resp) => {
              console.log(resp.data);
              swal(resp.data, "Password Changed Succesfully", {
                icon: "success",
              });
            })
            .catch((error) => {
              console.log(error.response.data);
              swal(
                error.response.data,
                "Password Change was not Successfull",
                "warning"
              );
            });
        }
      });
    } else {
      swal(
        "Password and Confirm Password Must Be Same",
        "Password Change Failed",
        "warning"
      );
    }
  };
  return (
    <>
      <NavBar />
      <div id="limiter1">
        <div id="container-login1001">
          <div id="wrap-login1001">
            <form
              id="login100-form1 validate-form"
              onSubmit={handleChangePassword}
            >
              <span id="login100-form-title1" style={{ color: "#27CCFD" }}>
                Change Password
              </span>
              <br />

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
                  label="Old Password"
                  variant="standard"
                  required
                  onChange={(e) => updateOldPassword(e.target.value)}
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
                  label="New Password"
                  variant="standard"
                  required
                  onChange={(e) => updateNewPassword(e.target.value)}
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
                  label="confirm new password"
                  variant="standard"
                  required
                  onChange={(e) => updateConfirmPassword(e.target.value)}
                />
              </Box>

              <div id="container-login100-form-btn1">
                <div id="wrap-login100-form-btn1">
                  <div id="login100-form-bgbtn1"></div>
                  <button
                    id="login100-form-btn1"
                    style={{ width: "100%" }}
                    type="submit"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default ChangePassword;
