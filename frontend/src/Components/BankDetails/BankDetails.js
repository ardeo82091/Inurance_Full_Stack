import NavBar from "../NavBar/NavBar";
import axios from "axios";
import swal from "sweetalert";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import IsValidUser from "../isValidUser/isValidUser";
import isAgentLoggedIn from "../isAgentLoggedIn/isAgentLoggedIn";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import isCustomerLoggedIn from "../isCustomerLoggedIn/isCustomerLoggedIn";
function BankDetails() {
  const [bankDetails, updateBankDetails] = useState("");
  const [withdrawAmount, updateWithdrawAmount] = useState("");
  const username = useParams().username;
  const navigation = new useNavigate();
  const [isLoggedIn, updateIsLoggedIn] = useState();
  const policyId = useLocation().state;
  useEffect(() => {
    isLoggedIn();
    async function isLoggedIn() {
      updateIsLoggedIn(await isCustomerLoggedIn(username));
      console.log(isLoggedIn);
    }
  }, []);

  if (!isLoggedIn) {
    return <IsValidUser />;
  }
  const handleAddStateName = async (e) => {
    e.preventDefault();
    if (bankDetails != "") {
      swal({
        title: "Are you sure?",
        text: "Click OK to withdraw",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (AddingState) => {
        if (AddingState === true) {
          await axios
            .post(`http://localhost:8082/api/v1/reqPolicyClaim/${username}`, {
              bankDetails,
              policyId,
            })
            .then((resp) => {
              swal(resp.data, "Withdraw Succesfull", {
                icon: "success",
              });
              navigation(`/CustomerDashboard/InsuranceAccount/${username}`);
            })
            .catch((error) => {
              swal(error.response.data, "Withdraw failed", "warning");
            });
        }
      });
    } else {
      swal("Require StateName", "Withdraw failed", "warning");
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
              onSubmit={handleAddStateName}
            >
              <span id="login100-form-title1" style={{ color: "#27CCFD" }}>
                Claim
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
                  required
                  label="BankName"
                  variant="standard"
                  // onChange={(e) => updateBankDetails(e.target.value)}
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
                  required
                  label="Account No"
                  variant="standard"
                  onChange={(e) => updateBankDetails(e.target.value)}
                />
              </Box>

              <div id="container-login100-form-btn1">
                <div id="wrap-login100-form-btn1">
                  <div id="login100-form-bgbtn1"></div>
                  <button
                    id="login100-form-btn1"
                    type="submit"
                    style={{ width: "100%" }}
                  >
                    Claim
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
export default BankDetails;
