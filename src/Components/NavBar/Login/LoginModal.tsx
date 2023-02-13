import axios from "axios";
import Cookies from "js-cookie";
import { Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { responseData } from "../../../Interfaces/interfaces";
import { BACKEND_URL } from "../../../store/employeeCrud";
import { useAppDispatch } from "../../../store/hooks";

export const LoginModal: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={true}
    >
      <Modal.Header>
        <Modal.Title id="employee-modal-title-vcenter">Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Please Login to proceed</p>
        <form
          id="login-form"
          onSubmit={(event: React.SyntheticEvent) => {
            event.preventDefault();
            const target = event.target as typeof event.target & {
              username: { value: string };
              password: { value: string };
            };

            axios<responseData>({
              method: "post",
              url: BACKEND_URL + `/login`,
              data: {
                username: target.username.value,
                password: target.password.value,
              },
            }).then((response) => {
              if (response.status == 200 && response.data.token != undefined) {
                Cookies.set("token", `${response.data.token}`);
                window.location.reload();
              } else {
                alert(`Login unsuccessful`);
              }
            });
          }}
        >
          <Container>
            <Row id="employee-modal-employee-name">
              <label htmlFor="name">Name: </label>
              <input
                type="text"
                id="login-modal-username"
                required={true}
                name="username"
              />
            </Row>
            <Row
              className="employee-form-row"
              id="employee-modal-employee-salary"
            >
              <label htmlFor="salary">Password: </label>
              <input
                type="text"
                id="login-modal-password"
                required={true}
                name="password"
              />
            </Row>
            {/* <input type="submit" /> */}
            <Modal.Footer>
              <Button id="login-form-submit" type="submit">
                Login
              </Button>
            </Modal.Footer>
          </Container>
        </form>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button id="login-form-submit" type="submit">
          Login
        </Button>
      </Modal.Footer> */}
    </Modal>
  );
};
