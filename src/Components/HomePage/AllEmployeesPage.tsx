import { Container, Row, Col } from "react-bootstrap";
import {
  allStates,
  employeeList,
  employeeData,
  pageState,
  reducer,
} from "../../Interfaces/interfaces";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Pages from "./Pagination";
import { EmployeeCellContainer } from "./EmployeeCells/EmployeeCellContainer";
import { useAppDispatch } from "../../store/hooks";

export const AllEmployeesPage = () => {
  const [State, setState] = useState<allStates>();
  const [Render, setRender] = useState<JSX.Element>(<div></div>);

  const state: allStates = useSelector((reducer: reducer) => {
    return reducer.employeeCrud;
  });

  const pageState: pageState = useSelector((reducer: reducer) => {
    return reducer.pageState;
  });

  const employees = state.employees;

  console.log(employees);

  useEffect(() => {
    setState(state);
    if (
      employees.response != undefined &&
      employees.response.data.employees != undefined
    ) {
      const employeeCcell = employees.response.data.employees.slice(
        (pageState.currentPage - 1) * 10,
        pageState.currentPage * 10
      );

      setRender(
        <div>
          <EmployeeCellContainer employeeData={employeeCcell} />
          <Pages employeeCount={employees.response.data.employees.length} />
        </div>
      );
    }
  }, [state, pageState]);

  return Render;
};
