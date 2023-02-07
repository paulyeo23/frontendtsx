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
  employees?: employeeList["employees"];
  employee?: employeeData;
  errorMessage?: string;
  departments?: { department: newEmployeeData["department"] }[];
}

export interface allStates {
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
  employeeCrud: allStates;
  pageState: pageState;
}
