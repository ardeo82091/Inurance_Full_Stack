import axios from "axios";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import swal from "sweetalert";
function AddAgentComp() {
  const [role, updateRole] = useState("agent");
  const [userName, updateUserName] = useState("");
  const [password, updatePassword] = useState("");
  const [address, updateAddress] = useState("");
  const [fullName, updateFullName] = useState("");
  const [emailId, updateEmailId] = useState("");
  const [isActive, updateIsActive] = useState(true);
  const [qualification, updateQualification] = useState();
  const [confirmPassword, updateConfirmPassword] = useState();
  const onAddAgent = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      swal({
        title: "Are you sure?",
        text: "Click OK for Adding an Agent",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (AddingAgent) => {
        if (AddingAgent === true) {
          await axios
            .post(`http://localhost:8082/api/v1/createAgent`, {
              fullName,
              userName,
              password,
              address,
              emailId,
              qualification,
              role,
              isActive,
            })
            .then((resp) => {
              swal(resp.data, "Created Succesfully", {
                icon: "success",
              });
            })
            .catch((error) => {
              swal(error.response.data, "Agent not Created", "warning");
            });
        }
      });
    } else {
      swal(
        "Agent not Created",
        "Password and Confirm Password are not same",
        "warning"
      );
    }
  };
  return (
    <>
      <div id="limiter1">
        <div id="container-login1001">
          <div id="wrap-login1001">
            <form id="login100-form1 validate-form" onSubmit={onAddAgent}>
              <span id="login100-form-title1" style={{ color: "#27CCFD" }}>
                Add Agent
              </span>

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
                  label="Fullname"
                  variant="standard"
                  required
                  minlength="3"
                  onChange={(e) => updateFullName(e.target.value)}
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
                  label="Email"
                  variant="standard"
                  onChange={(e) => updateEmailId(e.target.value)}
                  required
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
                  label="Username"
                  variant="standard"
                  required
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
                  required
                  variant="standard"
                  onChange={(e) => updatePassword(e.target.value)}
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
                  label="Confirm Password"
                  variant="standard"
                  required
                  onChange={(e) => updateConfirmPassword(e.target.value)}
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
                  label="Address"
                  variant="standard"
                  required
                  onChange={(e) => updateAddress(e.target.value)}
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
                  label="Qualification"
                  variant="standard"
                  required
                  onChange={(e) => updateQualification(e.target.value)}
                />
              </Box>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 270 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={isActive}
                  onChange={(event) => {
                    updateIsActive(event.target.value);
                  }}
                  label="Status"
                >
                  <MenuItem value={true}>Active</MenuItem>
                  <MenuItem value={false}>Inactive</MenuItem>
                  {/* <MenuItem value={30}>Thirty</MenuItem> */}
                </Select>
              </FormControl>

              <br />

              <div id="container-login100-form-btn1">
                <div id="wrap-login100-form-btn1">
                  <div id="login100-form-bgbtn1"></div>
                  <button
                    id="login100-form-btn1"
                    type="submit"
                    style={{ width: "100%" }}
                  >
                    Add Agent
                  </button>
                </div>
              </div>

              <div></div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default AddAgentComp;
