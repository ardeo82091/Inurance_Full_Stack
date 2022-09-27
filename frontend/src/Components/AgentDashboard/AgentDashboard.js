import NavBar from "../AgentNavBar/AgentNavBar";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import IsValidUser from "../isValidUser/isValidUser";
import isAgentLoggedIn from "../isAgentLoggedIn/isAgentLoggedIn";
import { useEffect, useState } from "react";
function AgentDashboard() {
  const navigate = new useNavigate();
  const username = useParams().username;
  const [isLoggedIn, updateIsLoggedIn] = useState();
  useEffect(() => {
    isLoggedIn();
    async function isLoggedIn() {
      updateIsLoggedIn(await isAgentLoggedIn(username));
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
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsfE9aR53XAf-rGwf8cRb22M57sFs0nW7dIA&usqp=CAU"
                  />

                  <Card.Body>
                    <Card.Title>Insurance</Card.Title>
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
                          navigate(`/AgentDashboard/ViewCustomer/${username}`);
                        }}
                      >
                        View Customer
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
                          navigate(`/AgentDashboard/Profile/${username}`);
                        }}
                      >
                        Profile
                      </Button>

                      <Button
                        variant="primary"
                        onClick={() => {
                          navigate(
                            `/AgentDashboard/ChangePassword/${username}`
                          );
                        }}
                      >
                        Change Password
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => {
                          navigate(`/AgentDashboard/Commission/${username}`);
                        }}
                      >
                        View Commission
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => {
                          navigate(
                            `/AgentDashboard/CommissionWithdrawal/${username}`
                          );
                        }}
                      >
                        View Commission Withdrawal
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => {
                          navigate(
                            `/AgentDashboard/WithdrawAmount/${username}`
                          );
                        }}
                      >
                        Withdraw Amount
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </div>
              <div
                id="AdminDashboardCards"
                onClick={() => {
                  navigate(`/AgentDashboard/InsuranceAccount/${username}`);
                }}
              >
                <Card style={{ width: "18rem", padding: "1rem" }}>
                  <Card.Img
                    variant="top"
                    height="254px"
                    width="254px"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREUQ0g0eunmR1T7t9RX5oUNz_gFiEjf_mttw&usqp=CAU"
                  />
                  <Card.Body>
                    <Card.Title>Marketing</Card.Title>
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
                          navigate(`/AgentDashboard/Marketing/${username}`);
                        }}
                      >
                        Marketing
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
export default AgentDashboard;
