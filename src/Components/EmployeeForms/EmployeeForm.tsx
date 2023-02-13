import React, { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

import {
  dataStates,
  employeeData,
  reducer,
  responseData,
} from "../../Interfaces/interfaces";
import { createEmployee, updateEmployee } from "../../store/employeeCrud";
import { useAppDispatch } from "../../store/hooks";

export const EmployeeForm: React.FC<{
  departments: responseData["departments"];
  employeeData?: employeeData | undefined;
}> = ({ departments, employeeData }): JSX.Element => {
  console.log(departments, employeeData);
  const departmentOptions: JSX.Element[] = [];

  const dispatch = useAppDispatch();

  departments?.forEach((depObj) => {
    departmentOptions.push(
      <option
        value={depObj.id}
        selected={
          employeeData != undefined
            ? employeeData.department == depObj.department
            : false
        }
      >
        {depObj.department}
      </option>
    );
  });

  const { singleEmployee }: dataStates = useSelector((reducer: reducer) => {
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
          department: { value: number };
        };

        employeeData == undefined
          ? dispatch(
              createEmployee({
                name: target.name.value,
                salary: target.salary.value,
                departmentId: target.department.value,
              })
            )
          : dispatch(
              updateEmployee({
                id: employeeData.id,
                name: target.name.value,
                salary: target.salary.value,
                departmentId: target.department.value,
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
              employeeData != undefined ? employeeData.name : employeeData
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
            defaultValue={employeeData != undefined ? employeeData.salary : ""}
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
