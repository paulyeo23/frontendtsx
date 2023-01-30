import { useState, useEffect, FC } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { employeeList, state, reducer } from "../../Interfaces/interfaces";

const Pages: React.FC<{ employeeCount: number | undefined }> = ({
  employeeCount,
}) => {
  console.log(employeeCount);
  const [CurrentPage, setCurrentPage] = useState<number>(1);
  const maxPage =
    employeeCount != undefined ? Math.ceil(employeeCount / 10) : 1;
  const minPage = 1;

  return (
    <Container>
      <Row>
        <Col>
          <Button
            disabled={CurrentPage - 1 < minPage}
            onClick={() => {
              setCurrentPage(CurrentPage - 1);
            }}
          >
            Previous
          </Button>
        </Col>
        <Col>
          <h1>{CurrentPage}</h1>
        </Col>
        <Col>
          <Button
            disabled={CurrentPage + 1 > maxPage}
            onClick={() => {
              setCurrentPage(CurrentPage + 1);
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
