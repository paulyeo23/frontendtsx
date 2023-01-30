import {
  crud,
  employeeData,
  employeeForm,
  employeeList,
  errorMessage,
  newEmployeeData,
  responseData,
  state,
} from "../Interfaces/interfaces";
import axios, { Axios, AxiosResponse } from "axios";

import {
  AsyncThunk,
  configureStore,
  createAsyncThunk,
  createSlice,
  Slice,
} from "@reduxjs/toolkit";

const BACKEND_URL: string = "http://localhost:3000";

/////////// crud Functions //////////
/*
const getAllEmployees: crud["getAllEmployees"] = async () => {
  return await axios.request<responseData>({
    method: "get",
    url: BACKEND_URL + "/employee",
  });
};
*/

export const getAllEmployees = createAsyncThunk("/get", async () => {
  const response = await axios<responseData>({
    method: "get",
    url: BACKEND_URL + "/employee",
  });
  return response;
});

export const createEmployee = createAsyncThunk(
  "/create",
  async (form: newEmployeeData): Promise<AxiosResponse<responseData>> => {
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
const initialState: state = {
  employees: [],
  isLoading: false,
  status: undefined,
  errorMessage: "",
};

const loadingState = (state: state): state => {
  state.isLoading = true;
  state.status = undefined;
  state.errorMessage = "";

  return state;
};

const endLoading = (
  state: state,
  response: AxiosResponse<responseData>
): state => {
  state.isLoading = false;
  state.status = response.status;
  state.employees = response.data.employees;
  state.errorMessage = response.data.errorMessage;
  state.status = response.status;
  return state;
};

/////////// state Functions //////////

const slice = createSlice({
  name: "employees",
  initialState: initialState,
  reducers: {
    /*
    employeeState: (state, action): void => {
      state = loadingState(state);
      console.log(state);
      getAllEmployees.then((result) => {
        state = endLoading(state, result);
      });
    },*/
  },
  extraReducers: (builder) => {
    builder.addCase(getAllEmployees.fulfilled, (state, action) => {
      state = endLoading(state, action.payload);
    });
    builder.addCase(createEmployee.fulfilled, (state, action) => {
      state = endLoading(state, action.payload);
    });
    builder.addCase(deleteEmployee.fulfilled, (state, action) => {
      state = endLoading(state, action.payload);
    });
    builder.addCase(updateEmployee.fulfilled, (state, action) => {
      state = endLoading(state, action.payload);
    });
    /*
    createEmployee: (state, action: { payload: newEmployeeData }): void => {
      loadingState(state);
      createEmployee(action.payload).then((result) => {
        endLoading(state, result);
      });
    },
    updateEmployee: (state, action: { payload: employeeForm }): void => {
      updateEmployee(action.payload);
    },
    deleteEmployee: (state, action: { payload: number }): void => {
      deleteEmployee(action.payload);
    },
    */
  },
});

export default slice.reducer;
/*
const { employeeState } = slice.actions;

export const updateEmployeeList =
  () =>
  async (
    dispatch: (payload: {
      payload: employeeList;
      type: "employees/employeeState";
    }) => any
  ) => {
    getAllEmployees().then((response) => {
      dispatch(employeeState(response));
    });
  };


const employeesReducer: Reducer<
  {
    employeeList: employeeList | [];
    newEmployeeData: newEmployeeData | { [key: string]: undefined };
  },
  Function
> = (
  prevState: employeeList = { employees: [] },
  action: AxiosResponse<employeeList | employeeData | employeeForm | {}>
): {
  state: employeeList;
} => {
  const results = action.data;
  let state: employeeList;
  if ("employees" in results) {
    state = results;
  } else {
    state = { employees: [] };
  }
  return {
    state,
  };
};


const store = configureStore({
  reducer: { employeesReducer: employeesReducer },
});

export default store;

const test = [undefined];
*/
