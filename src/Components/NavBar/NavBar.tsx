import { Button, Col, Container, Row } from "react-bootstrap";
import "./NavBar.css";
import "./Circle.css";
import { useEffect, useState } from "react";
import { getAllEmployees } from "../../store/employeeCrud";
import { useAppDispatch } from "../../store/hooks";
import { setCurrentPage } from "../../store/pages";
import { LogoutModal } from "./Login/LogoutModal";
import { LoginModal } from "./Login/LoginModal";
import Cookies from "js-cookie";

const NavBar: React.FC = () => {
  const [LogoutTrigger, triggerLogout] = useState<Date>();

  const dispatch = useAppDispatch();

  const token = Cookies.get("token");

  useEffect(() => {
    console.log(token);
    dispatch(getAllEmployees(token));
    dispatch(setCurrentPage(1));
  }, []);

  return (
    <nav className="navBar">
      {token == undefined ? <LoginModal /> : <></>}
      <LogoutModal trigger={LogoutTrigger} />
      <Container>
        <Row>
          <Col>
            <a href="/">
              <h2 className="float-left">Employees</h2>
            </a>
          </Col>
          <Col>
            <Button onClick={() => triggerLogout(new Date())}>Logout</Button>
          </Col>
          <Col className="float-right">
            <a href="/employee">
              <Button className="navButton mobile-false float-end ">
                <Container className="">
                  <Row>
                    <Col>
                      <span className="circle plus float-start"></span>
                    </Col>
                    <Col>Add Employee</Col>
                  </Row>
                </Container>
              </Button>
              <span className="circle plus mobile-true float-end"></span>
            </a>
          </Col>
        </Row>
      </Container>
    </nav>
  );
};

export default NavBar;
