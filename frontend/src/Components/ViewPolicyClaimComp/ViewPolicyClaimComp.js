import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Table from "react-bootstrap/Table";
import SearchInput, { createFilter } from "react-search-input";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
function ViewPolicyClaimComp() {
  const currentUser = useParams();
  const [Customers, updateCustomers] = useState(0);
  const [allCustomers, updateAllCustomers] = useState("");
  const [pageNumber, updatePageNumber] = useState(1);
  const [limit, updateLimit] = useState(5);
  const [searchTerm, updateSearchTerm] = useState("");
  const [open, setOpen] = useState("");
  const [propertyToUpdate, updatePropertyToUpdate] = useState("FirstName");
  const [value, updateValue] = useState("");
  const [customertoUpdate, updateCustomertoUpdate] = useState("");
  const [focused, setFocused] = useState(false);

  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  const handleClose = () => {
    setOpen(false);
  };
  const navigation = new useNavigate();

  useEffect(() => {
    getCustomer();
  }, [pageNumber, limit]);

  // const handleUpdate = (username) => {
  //   navigation(`/adminDashboard/UpdateCustomer/${currentUser.username}`, {
  //     state: username,
  //   });
  // };
  async function getCustomer() {
    axios
      .post("http://localhost:8082/api/v1/getAllCustomer", {
        limit,
        pageNumber,
      })
      .then((resp) => {
        let [allCusts, allCustsCount] = resp.data;
        updateAllCustomers(allCusts);
        updateCustomers(allCustsCount);
        console.log(allCusts);
      })
      .catch((error) => {
        swal(error.response.data, "Error Occured!", "warning");
      });
  }

  const searchUpdated = (term) => {
    updateSearchTerm(term);
  };

  const accceptClaim = (e, policyClaimId) => {
    e.preventDefault();
    axios
      .post("http://localhost:8082/api/v1/accptPolicyClaim", {
        policyClaimId,
      })
      .then((resp) => {
        console.log(resp.data);
        getCustomer();
      })
      .catch((error) => {
        swal(error.response.data, "Error Occured!", "warning");
      });
  };
  let rowOfEmployee;

  if (allCustomers != null) {
    let emps;
    if (focused) {
      emps = Customers;
    } else {
      emps = allCustomers;
    }
    if (emps != null) {
      const KEYS_TO_FILTERS = ["credential.userName"];
      const filteredEmails = Object.values(emps).filter(
        createFilter(searchTerm, KEYS_TO_FILTERS)
      );
      rowOfEmployee = filteredEmails.map((c) => {
        return c.claimPolicy.map((p) => {
          return (
            <tr id={c.credential.userName}>
              <td
                id={c.credential.userName}
                style={{ width: "15%", padding: "10px" }}
              >
                {c.credential.userName}
              </td>
              <td
                id={c.credential.userName}
                style={{ width: "15%", padding: "10px" }}
              >
                {p.insuranceAccount}
              </td>
              <td
                id={c.credential.userName}
                style={{ width: "15%", padding: "10px" }}
              >
                {p.insuranceScheme}
              </td>

              <td
                id={c.credential.userName}
                style={{ width: "8%", padding: "10px" }}
              >
                {p.sumAssureAfterYears.toFixed(2)}
              </td>

              <td
                id={c.credential.userName}
                style={{ width: "15%", padding: "10px" }}
              >
                {p.withdrawCheck ? <p>true</p> : <p>false</p>}
              </td>
              <td
                id={c.credential.userName}
                style={{ width: "15%", padding: "10px" }}
              >
                <button onClick={(event) => accceptClaim(event, p._id)}>
                  Accept
                </button>
              </td>
            </tr>
          );
        });
      });
    }
  }
  return (
    <>
      <div id="limiter2">
        <div id="container-login1002">
          <div id="wrap-login1002">
            <div>
              <span id="login100-form-title2" style={{ color: "#27CCFD" }}>
                Insurance Account
              </span>
              <br />
              <SearchInput
                className="search-input"
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={searchUpdated}
                style={{
                  width: "50%",
                  height: "40px",
                  background: "#F2F2F2",
                  color: "black",
                  border: "1px solid #E1D9D1",
                }}
              />
              <br />
              <div className="pagination" style={{ display: "inline-flex" }}>
                <label class="fw-bold">limit:</label>
                <select
                  style={{ width: "140px" }}
                  id="role"
                  name="role"
                  onChange={(e) => {
                    updateLimit(e.target.value);
                    updatePageNumber(1);
                  }}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                </select>
              </div>
              &nbsp;&nbsp;&nbsp;
              <div className="pagination" style={{ display: "inline-flex" }}>
                <Stack spacing={2}>
                  <Pagination
                    count={Math.ceil(Customers.length / limit)}
                    color="primary"
                    onChange={(e, value) => updatePageNumber(value)}
                  />
                </Stack>
              </div>{" "}
              <br />
              <br />
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th scope="col" style={{ width: "15%" }}>
                      UserName
                    </th>
                    <th scope="col" style={{ width: "15%" }}>
                      Insurance Acc
                    </th>
                    <th scope="col" style={{ width: "15%" }}>
                      Insurance Scheme
                    </th>
                    <th scope="col" style={{ width: "15%" }}>
                      Amount
                    </th>
                    <th scope="col" style={{ width: "10%" }}>
                      Approved
                    </th>
                    <th scope="col" style={{ width: "10%" }}>
                      Approve
                    </th>
                  </tr>
                </thead>
                <tbody>{rowOfEmployee}</tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ViewPolicyClaimComp;
