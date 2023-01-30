import { AxiosResponse } from "axios";

export interface newEmployeeData {
  name: string;
  salary: number;
  department: string;
}

export interface employeeData extends newEmployeeData {
  id: number;
}

export interface employeeList {
  employees: employeeData[];
}

export interface errormessage {
  errormessage: string;
}

// export interface newEmployeeData extends newEmployeeData {
//   name: HTMLInputElement & string;
//   department: HTMLInputElement & string;
//   salary: HTMLInputElement & number;
// }

export interface employeeForm extends newEmployeeData {
  id: number;
}

export interface errorMessage {
  errorMessage: string;
}

export interface responseData {
  employees: employeeList["employees"] | undefined;
  employee: employeeData | undefined;
  errorMessage: string | undefined;
}

export interface state extends Omit<employeeList, "employees"> {
  employees: employeeData[] | undefined;
  isLoading: boolean;
  status: number | undefined;
  errorMessage: string | undefined;
}

export interface reducer {
  allEmployees: state;
}

export interface crud {
  getAllEmployees: () => Promise<AxiosResponse<responseData>>;
  getOneEmployee: (id: number) => Promise<AxiosResponse<responseData>>;
  createEmployee: (
    form: newEmployeeData
  ) => Promise<AxiosResponse<responseData>>;
  updateEmployee: (form: employeeData) => Promise<AxiosResponse<responseData>>;
  deleteEmployee: (id: number) => Promise<AxiosResponse<responseData>>;
}
