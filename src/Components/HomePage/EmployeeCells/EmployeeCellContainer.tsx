import { Container, Row, Col } from "react-bootstrap";
import { employeeData, employeeList } from "../../../Interfaces/interfaces";
import EmployeeCell from "./EmployeeCell";
import "../../../index.css";

export const EmployeeCellContainer: React.FC<{
  employeeData?: employeeData[];
}> = ({ employeeData }) => {
  interface renderType {
    singleColumn: React.ReactElement[];
    doubleColumn: React.ReactElement[];
  }

  const cells: React.ReactElement[] = [];
  const render: renderType = { singleColumn: [], doubleColumn: [] };
  if (employeeData != undefined) {
    for (let i = 0; i < employeeData.length; i++) {
      const employee = employeeData[i];
      cells.push(<EmployeeCell employee={employee} />);
    }
  }

  for (let i = 0; i < cells.length; i++) {
    const currentCell = cells[i];
    const nextCell = cells[i + 1];
    render.singleColumn.push(<Row>{currentCell}</Row>);
    if (nextCell == undefined && currentCell != undefined) {
      render.doubleColumn.push(
        <Row>
          <Col>{currentCell}</Col>
        </Row>
      );
    } else if ((i + 1) % 2 == 1) {
      render.doubleColumn.push(
        <Row>
          <Col>{currentCell}</Col>
          <Col>{nextCell}</Col>
        </Row>
      );
    }
  }

  return (
    <div className="employee-cells">
      <Container className="employee-containers mobile-true">
        {render.singleColumn}
      </Container>
      <Container className=" employee-containers mobile-false">
        {render.doubleColumn}
      </Container>
    </div>
  );
};
