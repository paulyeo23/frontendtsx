import { Container, Row, Col, Pagination } from "react-bootstrap";
import EmployeeCell from "./EmployeeCells/EmployeeCell";
import { state, reducer } from "../../Interfaces/interfaces";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Pages from "./Pagination";
import { EmployeeCellContainer } from "./EmployeeCells/EmployeeCellContainer";

export const AllEmployeesPage = () => {
  const [State, setState] = useState<state>();
  const [Render, setRender] = useState<any>();

  const state: state = useSelector((reducer: reducer) => {
    return reducer.allEmployees;
  });

  useEffect(() => {
    setState(state);
  }, [state]);

  useEffect(() => {
    setRender(
      <div>
        <EmployeeCellContainer employeeData={state.employees} />
        <Pages employeeCount={state.employees?.length} />
      </div>
    );
  }, [State]);
  return Render;
};
