import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useRedirect } from "react-admin";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useAppDispatch } from "../../../store/hooks";

export const LogoutModal: React.FC<{ trigger?: Date }> = ({ trigger }) => {
  const [ShowModal, setShowModal] = useState(false);

  const dispatch = useAppDispatch();

  const redirect = useRedirect();

  useEffect(() => {
    setShowModal(trigger != undefined);
  }, [trigger]);

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={ShowModal}
      onHide={() => {
        setShowModal(false);
      }}
    >
      <Modal.Header>
        <Modal.Title id="employee-modal-title-vcenter">Logout</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Confirm logout?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          id="cancel-logout"
          onClick={() => {
            setShowModal(false);
          }}
        >
          Cancel
        </Button>
        <Button
          id="logout"
          onClick={() => {
            Cookies.remove("token");
            setShowModal(false);
            window.location.href = window.location.href;
            redirect("/");
          }}
        >
          Logout
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
