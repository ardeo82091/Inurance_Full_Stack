import { CDBFooter, CDBFooterLink, CDBBox, CDBBtn, CDBIcon } from "cdbreact";
import "./footer.css";
function Footer() {
  return (
    <CDBFooter className="shadow">
      <CDBBox
        display="flex"
        flex="column"
        className="mx-auto py-5"
        style={{ width: "90%" }}
      >
        <small className="text-center mt-5">
          &copy; E-Insurance, 2020. All rights reserved.
        </small>
      </CDBBox>
    </CDBFooter>
  );
}
export default Footer;
