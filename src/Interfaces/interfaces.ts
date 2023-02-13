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

export interface employeeForm extends Omit<newEmployeeData, "department"> {
  id?: number;
  departmentId: number;
}

export interface errorMessage {
  errorMessage: string;
}

export interface responseData {
  token?: string;
  employees?: employeeList["employees"];
  employee?: employeeData;
  errorMessage?: string;
  departments?: { id: number; department: string }[];
}

export interface dataStates {
  login: {
    response?: AxiosResponse<responseData>;
    isLoading: boolean;
  };
  employees: {
    response?: AxiosResponse<responseData>;
    isLoading: boolean;
  };
  departments: {
    response?: AxiosResponse<responseData>;
    isLoading: boolean;
  };
  singleEmployee: {
    response?: AxiosResponse<responseData>;
    isLoading: boolean;
  };
  deleteEmployee: {
    response?: AxiosResponse<responseData>;
    isLoading: boolean;
  };
}

export interface pageState {
  currentPage: number;
  employeeDetailModal: {
    employeeData: employeeData;
    showModal: {
      employeeDetail: boolean;
      deleteEmployee: boolean;
    };
  };
}

export interface reducer {
  employeeCrud: dataStates;
  pageState: pageState;
  token: { token: string };
}
