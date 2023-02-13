import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import { redirect } from "react-router-dom";
import {
  dataStates,
  employeeData,
  newEmployeeData,
  pageState,
  reducer,
} from "../../../Interfaces/interfaces";
import { useAppDispatch } from "../../../store/hooks";
import { hideEmployeeModal } from "../../../store/pages";
import { deleteEmployee } from "../../../store/employeeCrud";

export const DeleteEmployeeModal: React.FC<{
  employee?: employeeData | newEmployeeData;
  dateTime?: Date;
}> = ({}) => {
  const { employeeDetailModal }: pageState = useSelector((reducer: reducer) => {
    return reducer.pageState;
  });

  const deleteState: dataStates["deleteEmployee"] = useSelector(
    (reducer: reducer) => {
      return reducer.employeeCrud;
    }
  ).deleteEmployee;

  const { employeeData, showModal } = employeeDetailModal;

  useEffect(() => {
    if (deleteState.response != undefined) {
      if (deleteState.response.status == 204) {
        console.log(deleteState.response);
        alert(`Successfully deleted`);
        window.location.reload();
      } else if (deleteState.response?.status != undefined) {
        alert(
          `Error ${deleteState.response.status} : ${deleteState.response.data.errorMessage}`
        );
      }
    }
  }, [deleteState.response]);

  const dispatch = useAppDispatch();
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={showModal.deleteEmployee}
      onHide={() => {
        dispatch(hideEmployeeModal());
      }}
    >
      <Modal.Header closeButton={true}>
        <Modal.Title id="employee-modal-title-vcenter">Confirm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{`Remove ${employeeData.name}`}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            dispatch(hideEmployeeModal());
          }}
        >
          Cancel
        </Button>
        <Button
          className="bg-danger"
          onClick={() => {
            dispatch(deleteEmployee(employeeData.id));
          }}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
