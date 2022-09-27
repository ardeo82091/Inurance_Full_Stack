import "./Register.css";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import swal from "sweetalert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
function Login() {
  const navigation = new useNavigate();
  const [agentName, updateAgentName] = useState("");
  const [firstName, updateFirstName] = useState("");
  const [lastName, updateLastName] = useState("");
  const [userName, updateUserName] = useState("");
  const [password, updatePassword] = useState("");
  const [dateOfBirth, updateDateOfBirth] = useState(dayjs("2014-08-18"));
  const [address, updateAddress] = useState("");
  const [email, updateEmail] = useState("");
  const [pincode, updatePincode] = useState("");
  const [nominee, updateNominee] = useState("");
  const [nomineeRelation, updateNomineeRelation] = useState("");
  const [allStates, updateAllStates] = useState([]);
  const [allCities, updateAllCities] = useState([]);
  const [stateName, updateStateName] = useState("");
  const [cityName, updateCityName] = useState("");
  const [allAgents, updateAllAgents] = useState("");
  async function getStates() {
    await axios
      .get("http://localhost:8082/api/v1/getAllState")
      .then((resp) => {
        updateAllStates(resp.data);

        console.log(resp.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }
  async function getCities() {
    if (stateName != "") {
      await axios
        .post("http://localhost:8082/api/v1/getAllCity", { stateName })
        .then((resp) => {
          updateAllCities(resp.data);

          console.log(resp.data);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  }
  async function getAgents() {
    await axios
      .post("http://localhost:8082/api/v1/getAllAgent1")
      .then((resp) => {
        updateAllAgents(resp.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }
  const states = Object.values(allStates).map((s) => {
    return <MenuItem value={s.stateName}>{s.stateName}</MenuItem>;
  });
  const agents = Object.values(allAgents).map((a) => {
    return (
      <MenuItem value={a.credential.userName}>{a.credential.userName}</MenuItem>
    );
  });
  const cities = Object.values(allCities).map((s) => {
    return <MenuItem value={s.cityName}>{s.cityName}</MenuItem>;
  });

  useEffect(() => {
    getCities();
  }, [stateName]);
  useEffect(() => {
    getStates();
    getAgents();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    swal({
      title: "Are you sure?",
      text: "Click OK for Creating Your Customer Account",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (AddingCustomer) => {
      if (AddingCustomer === true) {
        await axios
          .post("http://localhost:8082/api/v1/createCustomer", {
            firstName,
            lastName,
            userName,
            password,
            dateOfBirth,
            address,
            email,
            stateName,
            cityName,
            pincode,
            nominee,
            nomineeRelation,
            agentName,
          })
          .then((resp) => {
            swal(
              resp.data,
              `Congrats!! ${userName},Customer Account Successfully Created`,
              {
                icon: "success",
              }
            );
          })
          .catch((error) => {
            swal(error.response.data, "Your Account is not Created", "warning");
          });
      }
    });
  };

  return (
    <>
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <span className="login100-form-title p-b-48">
              <i className="zmdi zmdi-font" style={{ color: "#AE2CFF" }}>
                E-Insurance
              </i>
            </span>
            <br></br>
            <span
              className="login100-form-title p-b-26"
              style={{ color: "#27CCFD" }}
            >
              Register
            </span>

            <form className="login100-form validate-form">
              <Box
                sx={{
                  "& > :not(style)": { m: 1, width: "32ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="standard-basic"
                  label="Firstname"
                  variant="standard"
                  onChange={(e) => updateFirstName(e.target.value)}
                />
              </Box>
              <Box
                sx={{
                  "& > :not(style)": { m: 1, width: "32ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="standard-basic"
                  label="Lastname"
                  variant="standard"
                  onChange={(e) => updateLastName(e.target.value)}
                />
              </Box>
              <Box
                sx={{
                  "& > :not(style)": { m: 1, width: "32ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="standard-basic"
                  label="Username"
                  onChange={(e) => updateUserName(e.target.value)}
                  variant="standard"
                />
              </Box>

              <Box
                sx={{
                  "& > :not(style)": { m: 1, width: "32ch" },
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
              <Box
                sx={{
                  "& > :not(style)": { m: 1, width: "32ch" },
                }}
                noValidate
                autoComplete="off"
              >
                {/* <TextField
                  id="standard-basic"
                  label="DOB"
                  variant="standard"
                  onChange={(e) => updateDateOfBirth(e.target.value)}
                /> */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    label="Date Of Birth"
                    inputFormat="DD/MM/YYYY"
                    value={dateOfBirth}
                    onChange={(value) => updateDateOfBirth(value)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Box>
              <Box
                sx={{
                  "& > :not(style)": { m: 1, width: "32ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="standard-basic"
                  label="Address"
                  onChange={(e) => updateAddress(e.target.value)}
                  variant="standard"
                />
              </Box>
              <Box
                sx={{
                  "& > :not(style)": { m: 1, width: "32ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="standard-basic"
                  label="Email"
                  onChange={(e) => updateEmail(e.target.value)}
                  variant="standard"
                />
              </Box>

              <FormControl variant="standard" sx={{ m: 1, minWidth: 270 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  State
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={stateName}
                  autoWidth
                  onChange={(event) => {
                    updateStateName(event.target.value);
                  }}
                  label="State"
                >
                  {states}
                </Select>
              </FormControl>

              <FormControl variant="standard" sx={{ m: 1, minWidth: 270 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  City
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={cityName}
                  autoWidth
                  onChange={(event) => {
                    updateCityName(event.target.value);
                  }}
                  label="State"
                >
                  {cities}
                </Select>
              </FormControl>

              <Box
                sx={{
                  "& > :not(style)": { m: 1, width: "32ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="standard-basic"
                  label="Pincode"
                  onChange={(e) => updatePincode(e.target.value)}
                  variant="standard"
                />
              </Box>
              <Box
                sx={{
                  "& > :not(style)": { m: 1, width: "32ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="standard-basic"
                  onChange={(e) => updateNominee(e.target.value)}
                  label="Nominee"
                  variant="standard"
                />
              </Box>
              <Box
                sx={{
                  "& > :not(style)": { m: 1, width: "32ch" },
                }}
                noValidate
                autoComplete="off"
              >
                {" "}
                <TextField
                  id="standard-basic"
                  label="Nominee Relation"
                  onChange={(e) => updateNomineeRelation(e.target.value)}
                  variant="standard"
                />
              </Box>
              <Box
                sx={{
                  "& > :not(style)": { m: 1, width: "32ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <FormControl variant="standard" sx={{ m: 1, minWidth: 270 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    Agent Name
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={agentName}
                    autoWidth
                    onChange={(event) => {
                      updateAgentName(event.target.value);
                    }}
                    label="State"
                  >
                    <MenuItem value="">No Agent</MenuItem>
                    {agents}
                  </Select>
                </FormControl>
              </Box>
            </form>
            <br />
            <br />

            <div className="container-login100-form-btn">
              <div className="wrap-login100-form-btn">
                <div className="login100-form-bgbtn"></div>
                <button className="login100-form-btn" onClick={handleRegister}>
                  Register
                </button>
              </div>
            </div>
            <br></br>
            {/* <div className="text-center">
              <span className="txt1">Don’t have an account?</span>

              <a className="txt2" href="/">
                Sign Up
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
