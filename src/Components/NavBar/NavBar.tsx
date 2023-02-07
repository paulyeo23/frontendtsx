import { Button, Col, Container, Row } from "react-bootstrap";
import "./NavBar.css";
import "./Circle.css";
// import { updateEmployeeList } from "../../store/employees";
import { useEffect } from "react";
import { getAllEmployees } from "../../store/employeeCrud";
import { useAppDispatch } from "../../store/hooks";
import { setCurrentPage } from "../../store/pages";
const NavBar: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllEmployees());
    dispatch(setCurrentPage(1));
  }, []);

  return (
    <nav className="navBar">
      <Container>
        <Row>
          <Col>
            <a href="/">
              <h2 className="float-left">Employees</h2>
            </a>
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
