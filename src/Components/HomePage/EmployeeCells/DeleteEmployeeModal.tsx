import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { employeeData, newEmployeeData } from "../../../Interfaces/interfaces";

export const DeleteEmployee: React.FC<{
  employee: employeeData | newEmployeeData;
  dateTime?: Date;
}> = ({ dateTime = new Date() }) => {
  const [ShowState, setShowState] = useState(false);
  useEffect(() => {
    setShowState(true);
  }, [dateTime]);
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={ShowState}
      onHide={() => setShowState(false)}
    >
      <Modal.Header closeButton={true}>
        <Modal.Title id="employee-modal-title-vcenter">
          Employee Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container></Container>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};
