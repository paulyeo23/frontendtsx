import { useEffect, useState } from "react";
import { useRedirect } from "react-admin";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { employeeData, reducer, dataStates } from "../../Interfaces/interfaces";
import { EmployeeForm } from "./EmployeeForm";
import "./employeeForm.css";

export const EmployeePage = () => {
  const [Render, setRender] = useState<JSX.Element>(<div></div>);
  const { employeeId, employeeName } = useParams();
  console.log(
    useSelector((reducer: reducer) => {
      return reducer;
    })
  );

  const dataStates: dataStates = useSelector((reducer: reducer) => {
    return reducer.employeeCrud;
  });

  let redirect = useRedirect();

  const departments = dataStates.departments;

  const nameToUrl = (name: string) => {
    name = name.replace(/\W+(?!$)/g, "-").toLowerCase();
    return name;
  };

  useEffect(() => {
    if (
      departments.response?.data?.departments != undefined &&
      dataStates.employees?.response?.data.employees != undefined
    ) {
      const employeeData: employeeData | undefined =
        dataStates.employees.response.data.employees.filter((employee) => {
          return employee.id == Number(employeeId);
        })[0];

      if (employeeData == undefined) {
        redirect("/employee/");
      } else if (nameToUrl(employeeData.name) != employeeName) {
        redirect(
          `/employee/${employeeData.id}/${nameToUrl(employeeData.name)}`
        );
      }

      console.log(employeeData);

      setRender(
        <div className="d-flex align-items-center justify-content-center">
          <EmployeeForm
            {...{
              departments: departments.response.data.departments,
              employeeData,
            }}
          />
        </div>
      );
    }
  }, [dataStates]);

  return Render;
};
