import { Col, Container, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import { pageState, reducer } from "../../../Interfaces/interfaces";
import { useAppDispatch } from "../../../store/hooks";
import { hideEmployeeModal } from "../../../store/pages";

export const EmployeeDetailsModal: React.FC<{}> = () => {
  const { employeeDetailModal }: pageState = useSelector((reducer: reducer) => {
    return reducer.pageState;
  });

  const { employeeData, showModal } = employeeDetailModal;

  const dispatch = useAppDispatch();

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={showModal.employeeDetail}
      onHide={() => {
        dispatch(hideEmployeeModal());
      }}
    >
      <Modal.Header closeButton={true}>
        <Modal.Title id="employee-modal-title-vcenter">
          Employee Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row id="employee-modal-employee-name">
            <Col>Name: </Col>
            <Col>{employeeData.name}</Col>
          </Row>
          <Row id="employee-modal-employee-salary">
            <Col>Salary: </Col>
            <Col>{employeeData.salary}</Col>
          </Row>
          <Row id="employee-modal-employee-department">
            <Col>Department: </Col>
            <Col>{employeeData.department}</Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};
