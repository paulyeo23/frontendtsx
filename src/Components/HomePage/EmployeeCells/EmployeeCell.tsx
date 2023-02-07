import { Container, Row, Col } from "react-bootstrap";

import { employeeData } from "../../../Interfaces/interfaces";
import { useAppDispatch } from "../../../store/hooks";
import { showEmployeeModal } from "../../../store/pages";

import "./employeeCell.css";

const EmployeeCell: React.FC<{
  employee: employeeData;
}> = ({ employee }) => {
  const nameToUrl = (name: string) => {
    name = name.replace(/\W+(?!$)/g, "-").toLowerCase();
    return name;
  };

  const dispatch = useAppDispatch();

  return (
    <div>
      <Container className="employee-cell">
        <Row>
          <div className="float-start fa">
            <h2
              className="employee-name"
              onClick={() => {
                dispatch(
                  showEmployeeModal({
                    employeeData: employee,
                    modalType: "employeeDetail",
                  })
                );
              }}
            >
              {employee.name}
            </h2>
          </div>
        </Row>
        <Row>
          <Col className="float-start">{employee.department}</Col>
          <Col>
            <Row className="float-end">
              <Col>
                <a
                  href={`/employee/${employee.id}/${nameToUrl(employee.name)}`}
                >
                  <i className="fa fa-pencil" />
                </a>
              </Col>
              <Col>
                <i
                  className="fa fa-trash-o"
                  onClick={() => {
                    dispatch(
                      showEmployeeModal({
                        employeeData: employee,
                        modalType: "deleteEmployee",
                      })
                    );
                  }}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <div className="float-start">{employee.salary}</div>
        </Row>
      </Container>
    </div>
  );
};

export default EmployeeCell;
