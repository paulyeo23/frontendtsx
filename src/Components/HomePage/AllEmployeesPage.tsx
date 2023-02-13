import { Container, Row, Col } from "react-bootstrap";
import { dataStates, pageState, reducer } from "../../Interfaces/interfaces";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Pages from "./Pagination";
import { EmployeeCellContainer } from "./EmployeeCells/EmployeeCellContainer";
import { DeleteEmployeeModal } from "./EmployeeCells/DeleteEmployeeModal";
import { EmployeeDetailsModal } from "./EmployeeCells/EmployeeModal";

export const AllEmployeesPage = () => {
  const [Render, setRender] = useState<JSX.Element>(<div></div>);

  const state: dataStates = useSelector((reducer: reducer) => {
    return reducer.employeeCrud;
  });

  const pageState: pageState = useSelector((reducer: reducer) => {
    return reducer.pageState;
  });

  const employees = state.employees;

  useEffect(() => {
    if (employees.response?.data.employees != undefined) {
      const employeeCells = employees.response.data.employees.slice(
        (pageState.currentPage - 1) * 10,
        pageState.currentPage * 10
      );

      setRender(
        <div>
          <EmployeeDetailsModal />
          <DeleteEmployeeModal />
          <EmployeeCellContainer employeeData={employeeCells} />
          <Pages employeeCount={employees.response.data.employees.length} />
        </div>
      );
    }
  }, [state, pageState]);

  return Render;
};
