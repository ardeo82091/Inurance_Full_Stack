import NavBar from "../NavBarAdmin/NavBarAdmin";
import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import axios from "axios";
import swal from "sweetalert";
import IsValidUser from "../isValidUser/isValidUser";
import isAdminLoggedIn from "../isAdminLoggedIn/isAdminLoggedIn";
import { useParams } from "react-router-dom";
function InsuranceSettings() {
  const [claimDeduction, setDeduction] = useState(0);
  const [penaltyPay, setpenaltyPay] = useState(0);
  const userName = useParams().username;
  const [isLoggedIn, updateIsLoggedIn] = useState();
  useEffect(() => {
    isLoggedIn();
    async function isLoggedIn() {
      updateIsLoggedIn(await isAdminLoggedIn(userName));
      console.log(isLoggedIn);
    }
  }, []);

  if (!isLoggedIn) {
    return <IsValidUser />;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    swal({
      title: "Are you sure?",
      text: "Click OK for Updating Insurance Settings",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (AddingCity) => {
      if (AddingCity === true) {
        await axios
          .post("http://localhost:8082/api/v1/updateinsuranceSetting", {
            claimDeduction,
            penaltyPay,
          })
          .then((resp) => {
            console.log(resp.data);
            swal(resp.data, "Update Succesfully", {
              icon: "success",
            });
          })
          .catch((error) => {
            console.log(error.response.data);
            swal(error.response.data, "Update was not Successfull", "warning");
          });
      }
    });
  };
  return (
    <>
      <NavBar />
      <div id="limiter1">
        <div id="container-login1001">
          <div id="wrap-login1001">
            <h1
              className="h1"
              style={{
                color: "purple",
                textAlign: "center",
                textStyle: "bold",
              }}
            >
              Insurance Settings
            </h1>
            <br />
            <br />

            <form noValidate autoComplete="off" style={{ textAlign: "center" }}>
              <TextField
                type="number"
                min="0"
                step="1"
                value={claimDeduction && Math.max(0, claimDeduction)}
                onChange={(e) =>
                  setDeduction(
                    e.target.value ? Number(e.target.value) : e.target.value
                  )
                }
                id="outlined-basic"
                label="Claim Deduction in %"
                variant="outlined"
              />
              <br />
              <br />

              <TextField
                type="number"
                min="0"
                step="1"
                value={penaltyPay && Math.max(0, penaltyPay)}
                onChange={(e) =>
                  setpenaltyPay(
                    e.target.value ? Number(e.target.value) : e.target.value
                  )
                }
                id="outlined-basic"
                label="Penalty Amount In %"
                variant="outlined"
              />
              <br />
              <br />
              <div className="container-login100-form-btn1">
                <div
                  className="wrap-login100-form-btn1"
                  style={{ width: "200px" }}
                >
                  <div className="login100-form-bgbtn1"></div>
                  <button
                    className="login100-form-btn1"
                    style={{ width: "100%" }}
                    onClick={handleSubmit}
                  >
                    Update
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
export default InsuranceSettings;
