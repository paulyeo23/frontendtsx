import { Container, Row, Col } from "react-bootstrap";
import { redirect, useNavigate } from "react-router-dom";
import { employeeData, newEmployeeData } from "../../../Interfaces/interfaces";
import "./employeeCell.css";

const EmployeeCell: React.FC<{
  employee: employeeData;
}> = ({ employee }) => {
  const nameToUrl = (name: string) => {
    name = name.replace(/\W+(?!$)/g, "-").toLowerCase();
    return name;
  };

  return (
    <Container className="employee-cell">
      <Row>
        <div className="float-start">
          <h2 className="employee-name">{employee.name}</h2>
        </div>
      </Row>
      <Row>
        <Col className="float-start">{employee.department}</Col>
        <Col>
          <Row className="float-end">
            <Col>
              <a href={`/employee/${employee.id}/${nameToUrl(employee.name)}`}>
                <i className="fa fa-pencil" />
              </a>
            </Col>
            <Col>
              <i className="fa fa-trash-o" />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <div className="float-start">{employee.salary}</div>
      </Row>
    </Container>
  );
};

export default EmployeeCell;
