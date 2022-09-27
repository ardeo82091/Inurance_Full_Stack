import { useNavigate } from "react-router-dom";
function IsValidUser() {
  const navigation = new useNavigate();
  return (
    <>
      <div id="limiter1">
        <div id="container-login1001">
          <div id="wrap-login1001">
            <span id="login100-form-title1" style={{ color: "#27CCFD" }}>
              Please Login
            </span>
            <br />
            <p>Please Login Using Below Button To Access This Page</p>
            <div id="container-login100-form-btn1">
              <div id="wrap-login100-form-btn1">
                <div id="login100-form-bgbtn1"></div>
                <button
                  id="login100-form-btn1"
                  onClick={() => {
                    navigation("/");
                  }}
                  style={{ width: "100%" }}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default IsValidUser;
