import { useEffect, useState } from "react";
import { Show } from "react-admin";
import { Container, Row, Col } from "react-bootstrap";
import { redirect, useNavigate } from "react-router-dom";
import { employeeData, newEmployeeData } from "../../../Interfaces/interfaces";
import "./employeeCell.css";
import { EmployeeDetailsModal } from "./EmployeeModal";

const EmployeeCell: React.FC<{
  employee: employeeData;
}> = ({ employee }) => {
  const [ShowState, setShowState] = useState(false);

  const [RenderModal, setRenderModal] = useState(<div></div>);

  const nameToUrl = (name: string) => {
    name = name.replace(/\W+(?!$)/g, "-").toLowerCase();
    return name;
  };

  // const restartShowState = () => {
  //   setShowState(false);
  //   setTimeout(() => {
  //     setShowState(true);
  //   }, 10);
  // };

  const Modal = (
    <EmployeeDetailsModal {...{ employee: employee, show: true }} />
  );

  useEffect(() => {
    setRenderModal(ShowState == true ? Modal : <div></div>);
  }, [ShowState]);

  return (
    <div>
      {RenderModal}
      <Container className="employee-cell">
        <Row>
          <div className="float-start fa">
            <h2
              className="employee-name"
              onClick={() => {
                setRenderModal(
                  <EmployeeDetailsModal
                    {...{
                      employee: employee,
                      dateTime: new Date(),
                    }}
                  />
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
                <i className="fa fa-trash-o" />
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
