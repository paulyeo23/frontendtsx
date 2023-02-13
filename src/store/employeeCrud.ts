import {
  employeeForm,
  newEmployeeData,
  responseData,
  dataStates,
} from "../Interfaces/interfaces";
import axios, { AxiosResponse } from "axios";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { reducer } from "../Interfaces/interfaces";

export const BACKEND_URL: string = "http://localhost:3000";

/////////// crud Functions //////////

export const getAllEmployees = createAsyncThunk(
  "/get",
  async (token: string = "") => {
    const employees = await axios<responseData>({
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "get",
      url: BACKEND_URL + "/employee",
    });
    const departments = await axios<responseData>({
      method: "get",
      url: BACKEND_URL + "/departments",
    });
    return { employees: employees, departments: departments };
  }
);

export const getOneEmployee = createAsyncThunk("/get", async (id: number) => {
  const response = await axios<responseData>({
    method: "get",
    url: BACKEND_URL + `/employee/${id}`,
  });
  return response;
});

export const createEmployee = createAsyncThunk(
  "/create",
  async (form: employeeForm): Promise<AxiosResponse<responseData>> => {
    return await axios({
      method: "post",
      url: BACKEND_URL + "/employee",
      data: form,
    });
  }
);

export const updateEmployee = createAsyncThunk(
  "/update",
  (form: employeeForm): Promise<AxiosResponse<responseData>> => {
    return axios({
      method: "put",
      url: BACKEND_URL + `/employee/${form.id}`,
      data: form,
    });
  }
);
export const deleteEmployee = createAsyncThunk(
  "delete",
  async (id: number): Promise<AxiosResponse<responseData>> => {
    return await axios({
      method: "delete",
      url: BACKEND_URL + `/employee/${id}`,
    });
  }
);

/////////// crud Functions //////////

/////////// state Functions //////////
const loading = { response: undefined, isLoading: true };

const initialState: dataStates = {
  login: { response: undefined, isLoading: false },
  employees: { response: undefined, isLoading: false },
  departments: { response: undefined, isLoading: false },
  singleEmployee: { response: undefined, isLoading: false },
  deleteEmployee: { response: undefined, isLoading: false },
};

const reloadState = (
  state: dataStates,
  stateType: "employees" | "departments" | "singleEmployee" | "deleteEmployee"
): dataStates => {
  state[stateType] = loading;
  return state;
};

const endLoadingEmployees = (
  state: dataStates,
  response: {
    employees: AxiosResponse<responseData>;
    departments: AxiosResponse<responseData>;
  }
): dataStates => {
  state.employees = {
    response: response.employees,
    isLoading: false,
  };
  state.departments = {
    response: response.departments,
    isLoading: false,
  };

  return state;
};

const endLoadingSingleEmployee = (
  state: dataStates,
  response: AxiosResponse<responseData>
): dataStates => {
  state.singleEmployee = {
    response: response,
    isLoading: false,
  };

  console.log(state.deleteEmployee);
  return state;
};

const endDeleteEmployee = (
  state: dataStates,
  response: AxiosResponse<responseData>
): dataStates => {
  state.deleteEmployee = {
    response: response,
    isLoading: false,
  };

  return state;
};

/////////// state Functions //////////

const slice = createSlice({
  name: "employees",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllEmployees.pending, (state) => {
        state = reloadState(state, "employees");
      })
      .addCase(getAllEmployees.fulfilled, (state, action) => {
        state = endLoadingEmployees(state, action.payload);
      })
      .addCase(createEmployee.pending, (state) => {
        state = reloadState(state, "singleEmployee");
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state = endLoadingSingleEmployee(state, action.payload);
      })
      .addCase(deleteEmployee.pending, (state) => {
        state = reloadState(state, "deleteEmployee");
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state = endDeleteEmployee(state, action.payload);
      })
      .addCase(updateEmployee.pending, (state) => {
        state = reloadState(state, "singleEmployee");
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state = endLoadingSingleEmployee(state, action.payload);
      });
  },
});

export default slice.reducer;
