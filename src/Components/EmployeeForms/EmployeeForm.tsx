import React, { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

import { allStates, employeeForm, reducer } from "../../Interfaces/interfaces";
import { createEmployee, updateEmployee } from "../../store/employeeCrud";
import { useAppDispatch } from "../../store/hooks";

export const EmployeeForm: React.FC<{
  departments: { department: string }[];
  employeeForm?: employeeForm | undefined;
}> = ({ departments, employeeForm }): JSX.Element => {
  const departmentOptions: JSX.Element[] = [];

  const dispatch = useAppDispatch();

  departments.forEach((depObj) => {
    departmentOptions.push(
      <option
        value={depObj.department}
        selected={
          employeeForm != undefined
            ? employeeForm.department == depObj.department
            : false
        }
      >
        {depObj.department}
      </option>
    );
  });

  const { singleEmployee }: allStates = useSelector((reducer: reducer) => {
    return reducer.employeeCrud;
  });

  useEffect(() => {
    if (
      singleEmployee.response != undefined &&
      singleEmployee.isLoading == false
    ) {
      if (singleEmployee.response.status == 200) {
        alert(`Entry successfully created`);
        window.location.reload();
      } else {
        alert(
          `Error ${singleEmployee.response.status} : ${singleEmployee.response.data.errorMessage}`
        );
      }
    }
  }, [singleEmployee]);

  return (
    <form
      onSubmit={(event: React.SyntheticEvent) => {
        event.preventDefault();
        const target = event.target as typeof event.target & {
          name: { value: string };
          salary: { value: number };
          department: { value: string };
        };

        employeeForm == undefined
          ? dispatch(
              createEmployee({
                name: target.name.value,
                salary: target.salary.value,
                department: target.department.value,
              })
            )
          : dispatch(
              updateEmployee({
                id: employeeForm.id,
                name: target.name.value,
                salary: target.salary.value,
                department: target.department.value,
              })
            );
      }}
      className="employee-form"
    >
      <Container>
        <Row className="employee-form-row" id="employee-modal-employee-details">
          <h4>Employee details</h4>
        </Row>
        <Row id="employee-modal-employee-name">
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="employee-name"
            required={true}
            name="name"
            defaultValue={
              employeeForm != undefined ? employeeForm.name : employeeForm
            }
          />
        </Row>
        <Row className="employee-form-row" id="employee-modal-employee-salary">
          <label htmlFor="salary">Salary: </label>
          <input
            type="text"
            id="employee-salary"
            required={true}
            name="salary"
            defaultValue={employeeForm != undefined ? employeeForm.salary : ""}
          />
        </Row>
        <Row
          className="employee-form-row"
          id="employee-modal-employee-department"
        >
          <label htmlFor="department">Department: </label>
          <select
            required={true}
            name="department"
            aria-label="Default select example"
          >
            <option value="">Select Department</option>
            {departmentOptions}
          </select>
        </Row>
        <Row
          className="employee-form-row d-flex align-items-center justify-content-center"
          id="employee-modal-employee-department"
        >
          <input type="submit" />
        </Row>
      </Container>
    </form>
  );
};
