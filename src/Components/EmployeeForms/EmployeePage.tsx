import { useEffect, useState } from "react";
import { useRedirect } from "react-admin";
import { useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import {
  employeeForm,
  employeeData,
  reducer,
  allStates,
} from "../../Interfaces/interfaces";
import { EmployeeForm } from "./EmployeeForm";
import "./employeeForm.css";

export const EmployeePage = () => {
  const [Render, setRender] = useState<JSX.Element>(<div></div>);
  const { employeeId, employeeName } = useParams();

  const allStates: allStates = useSelector((reducer: reducer) => {
    return reducer.employeeCrud;
  });

  let redirect = useRedirect();

  const departments = allStates.departments;

  const nameToUrl = (name: string) => {
    name = name.replace(/\W+(?!$)/g, "-").toLowerCase();
    return name;
  };

  useEffect(() => {
    if (
      departments.response?.data?.departments != undefined &&
      allStates.employees?.response?.data.employees != undefined
    ) {
      const employeeForm: employeeForm | undefined =
        allStates.employees.response.data.employees.filter((employee) => {
          return employee.id == Number(employeeId);
        })[0];

      if (employeeForm == undefined) {
        redirect("/employee/");
      } else if (nameToUrl(employeeForm.name) != employeeName) {
        redirect(
          `/employee/${employeeForm.id}/${nameToUrl(employeeForm.name)}`
        );
      }

      setRender(
        <div className="d-flex align-items-center justify-content-center">
          <EmployeeForm
            {...{
              departments: departments.response.data.departments,
              employeeForm: employeeForm,
            }}
          />
        </div>
      );
    }
  }, [allStates]);

  return Render;
};
