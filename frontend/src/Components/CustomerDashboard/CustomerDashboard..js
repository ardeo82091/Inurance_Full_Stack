import NavBar from "../NavBar/NavBar";
import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import swal from "sweetalert";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import IsValidUser from "../isValidUser/isValidUser";
import isCustomerLoggedIn from "../isCustomerLoggedIn/isCustomerLoggedIn";

import "./CustomerDashboard.css";
function CustomerDashboard() {
  const navigate = new useNavigate();
  const username = useParams().username;
  const [insuranceType, updateInsuranceType] = useState("");
  const [isLoggedIn, updateIsLoggedIn] = useState();
  useEffect(() => {
    isLoggedIn();
    async function isLoggedIn() {
      updateIsLoggedIn(await isCustomerLoggedIn(username));
      console.log(isLoggedIn);
    }
  }, []);
  useEffect(() => {
    getAllInsuranceTypes();
  }, []);
  if (!isLoggedIn) {
    return <IsValidUser />;
  }

  async function getAllInsuranceTypes() {
    await axios
      .get("http://localhost:8082/api/v1/getAllInsuranceType")
      .then((resp) => {
        console.log(resp.data);
        updateInsuranceType(resp.data);
      })
      .catch((error) => {
        console.log(error.response.data);
        swal(error.response.data, "Error Occured", "warning");
      });
  }
  const handleOnClick = (i) => {
    navigate(`/CustomerDashboard/InsuranceScheme/${username}`, {
      state: i,
    });
  };

  let OptionOfInsuranceTypes;
  if (insuranceType != null) {
    OptionOfInsuranceTypes = Object.values(insuranceType).map((i) => {
      return (
        <Button
          variant="primary"
          onClick={() => {
            handleOnClick(i.insuranceType);
          }}
        >
          {i.insuranceType}
        </Button>
      );
    });
  }
  return (
    <>
      <NavBar />
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                flexWrap: "wrap",
                rowGap: "2em",
              }}
            >
              <div id="AdminDashboardCards">
                <Card style={{ width: "18rem", padding: "1rem" }}>
                  <Card.Img
                    variant="top"
                    height="254px"
                    width="254px"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsfE9aR53XAf-rGwf8cRb22M57sFs0nW7dIA&usqp=CAU"
                  />

                  <Card.Body>
                    <Card.Title>Insurance Type</Card.Title>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        flexWrap: "wrap",
                        rowGap: "1.1em",
                      }}
                    >
                      {OptionOfInsuranceTypes}
                    </div>
                  </Card.Body>
                </Card>
              </div>
              <div id="AdminDashboardCards">
                <Card style={{ width: "18rem", padding: "1rem" }}>
                  <Card.Img
                    variant="top"
                    height="254px"
                    width="254px"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfwfzTPVw45cJcHNUp3sWUWLOkYAfQlAEBOQ&usqp=CAU"
                  />
                  <Card.Body>
                    <Card.Title>Account</Card.Title>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        flexWrap: "wrap",
                        rowGap: "1.1em",
                      }}
                    >
                      <Button
                        variant="primary"
                        onClick={() => {
                          navigate(
                            `/CustomerDashboard/CustomerProfile/${username}`
                          );
                        }}
                      >
                        Profile
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => {
                          navigate(
                            `/CustomerDashboard/CustomerDocument/${username}`
                          );
                        }}
                      >
                        Document
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => {
                          navigate(
                            `/CustomerDashboard/CustomerChangePassword/${username}`
                          );
                        }}
                      >
                        Change Password
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </div>
              <div
                id="AdminDashboardCards"
                onClick={() => {
                  navigate(`/CustomerDashboard/InsuranceAccount/${username}`);
                }}
              >
                <Card style={{ width: "18rem", padding: "1rem" }}>
                  <Card.Img
                    variant="top"
                    height="254px"
                    width="254px"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7V4AhHJDGybY_McwD634MW666JerOafDbBQ&usqp=CAU"
                  />
                  <Card.Body>
                    <Card.Title>Insurance Account</Card.Title>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        flexWrap: "wrap",
                        rowGap: "1.1em",
                      }}
                    ></div>
                  </Card.Body>
                </Card>
              </div>
              <div id="AdminDashboardCards">
                <Card style={{ width: "18rem", padding: "1rem" }}>
                  <Card.Img
                    variant="top"
                    height="254px"
                    width="254px"
                    src="data:image/jpeg;base64,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"
                  />
                  <Card.Body>
                    <Card.Title>Query</Card.Title>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        flexWrap: "wrap",
                        rowGap: "1.1em",
                      }}
                    >
                      <Button
                        variant="primary"
                        onClick={() => {
                          navigate(`/CustomerDashboard/Enquiry/${username}`);
                        }}
                      >
                        Enquiry
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => {
                          navigate(
                            `/CustomerDashboard/CustomerViewFeedback/${username}`
                          );
                        }}
                      >
                        View feedback
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default CustomerDashboard;
