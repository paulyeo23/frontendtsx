import { Container, Row, Col } from "react-bootstrap";
import { employeeData, newEmployeeData } from "../../../Interfaces/interfaces";

const EmployeeCell: React.FC<{
  employee: employeeData | newEmployeeData;
}> = ({ employee }) => {
  return (
    <Container>
      <Row>
        <div className="float-start">
          <h2 className="employee-name">{employee.name}</h2>
        </div>
      </Row>
      <Row>
        <Col className="float-start">{employee.department}</Col>
        <Col className="float-end">
          <Row>
            <i className="fa fa-pencil" />
          </Row>
          <Row>
            <i className="fa fa-trash-o" />
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
