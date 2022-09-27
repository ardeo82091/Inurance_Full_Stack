import NavBar from "../EmployeeNavBar/EmployeeNavBar";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import IsValidUser from "../isValidUser/isValidUser";
import isEmployeeLoggedIn from "../isEmployeeLoggedIn/isEmployeeLoggedIn";

import { useEffect, useState } from "react";
function EmployeeDashboard() {
  const navigate = new useNavigate();
  const username = useParams().username;

  const [isLoggedIn, updateIsLoggedIn] = useState();
  useEffect(() => {
    isLoggedIn();
    async function isLoggedIn() {
      updateIsLoggedIn(await isEmployeeLoggedIn(username));
      console.log(isLoggedIn);
    }
  }, []);

  if (!isLoggedIn) {
    return <IsValidUser />;
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
                    src="data:image/png;base64,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"
                  />
                  <Card.Body>
                    <Card.Title>Agent</Card.Title>
                    <br />

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
                          navigate(`/EmployeeDashboard/AddAgent/${username}`);
                        }}
                      >
                        Add
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => {
                          navigate(`/EmployeeDashboard/ViewAgent/${username}`);
                        }}
                      >
                        View
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => {
                          navigate(
                            `/EmployeeDashboard/ViewCommission/${username}`
                          );
                        }}
                      >
                        View Commission
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => {
                          navigate(
                            `/EmployeeDashboard/ViewCommissionWithdrawal/${username}`
                          );
                        }}
                      >
                        View Commission Withdrawal
                      </Button>
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
                      <Button
                        variant="primary"
                        onClick={() => {
                          navigate(
                            `/EmployeeDashboard/ViewInsuranceType/${username}`
                          );
                        }}
                      >
                        View Insurance Type
                      </Button>

                      <Button
                        variant="primary"
                        onClick={() => {
                          navigate(
                            `/EmployeeDashboard/ViewInsuranceScheme/${username}`
                          );
                        }}
                      >
                        View Insurance Scheme
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => {
                          navigate(
                            `/EmployeeDashboard/ViewInsurancePlan/${username}`
                          );
                        }}
                      >
                        View Insurance Plan
                      </Button>
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
                          navigate(`/EmployeeDashboard/Profile/${username}`);
                        }}
                      >
                        Profile
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => {
                          navigate(
                            `/EmployeeDashboard/ChangePassword/${username}`
                          );
                        }}
                      >
                        Change Password
                      </Button>
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
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7V4AhHJDGybY_McwD634MW666JerOafDbBQ&usqp=CAU"
                  />
                  <Card.Body>
                    <Card.Title>Settings</Card.Title>
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
                          navigate(`/EmployeeDashboard/ViewCity/${username}`);
                        }}
                      >
                        View City
                      </Button>

                      <Button
                        variant="primary"
                        onClick={() => {
                          navigate(`/EmployeeDashboard/ViewState/${username}`);
                        }}
                      >
                        View State
                      </Button>
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
                          navigate(
                            `/EmployeeDashboard/ViewFeedback/${username}`
                          );
                        }}
                      >
                        view feedback
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
export default EmployeeDashboard;
