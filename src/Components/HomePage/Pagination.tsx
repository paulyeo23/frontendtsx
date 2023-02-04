import { Container, Col, Row, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { pageState, reducer } from "../../Interfaces/interfaces";
import { useAppDispatch } from "../../store/hooks";
import { increaseCurrentPage, decreaseCurrentPage } from "../../store/pages";

const Pages: React.FC<{ employeeCount: number }> = ({ employeeCount }) => {
  const pageState: pageState = useSelector((reducer: reducer) => {
    return reducer.pageState;
  });

  const maxPages = Math.floor(employeeCount / 10) + 1;
  const minPages = 1;

  const dispatch = useAppDispatch();

  return (
    <Container>
      <Row className="float-end">
        <Col></Col>
        <Col>
          <Button
            disabled={pageState.currentPage - 1 < minPages}
            onClick={() => {
              dispatch(decreaseCurrentPage(minPages));
            }}
          >
            Previous
          </Button>
        </Col>
        <Col>
          <h1>{pageState.currentPage}</h1>
        </Col>
        <Col>
          <Button
            disabled={pageState.currentPage + 1 > maxPages}
            onClick={() => {
              dispatch(increaseCurrentPage(maxPages));
            }}
          >
            Next
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Pages;
