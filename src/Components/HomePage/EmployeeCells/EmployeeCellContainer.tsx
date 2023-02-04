import { Container, Row, Col } from "react-bootstrap";
import { employeeData, employeeList } from "../../../Interfaces/interfaces";
import EmployeeCell from "./EmployeeCell";
import "../../../index.css";

export const EmployeeCellContainer: React.FC<{
  employeeData?: employeeData[];
}> = ({ employeeData }) => {
  console.log(employeeData);
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
    const previousCell = cells[i - 1];
    const currentCell = cells[i];
    const nextCell = cells[i + 1];
    render.singleColumn.push(<Row>{currentCell}</Row>);
    if (nextCell == undefined) {
      if (i % 2 == 1) {
        render.doubleColumn.push(
          <Row>
            <Col>{previousCell}</Col>
            <Col>{currentCell}</Col>
          </Row>
        );
      } else {
        render.doubleColumn.push(
          <Row>
            <Col>{currentCell}</Col>
            <Col></Col>
          </Row>
        );
      }
      break;
    } else if (i % 2 == 1) {
      render.doubleColumn.push(
        <Row>
          <Col>{previousCell}</Col>
          <Col>{currentCell}</Col>
        </Row>
      );
    }
  }

  return (
    <div className="employee-cells">
      <Container className="employee-cell-container mobile-true">
        {render.singleColumn}
      </Container>
      <Container className=" employee-cell-container mobile-false">
        {render.doubleColumn}
      </Container>
    </div>
  );
};
