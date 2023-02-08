import { pageState } from "../Interfaces/interfaces";

import { createSlice } from "@reduxjs/toolkit";

/////////// state Functions //////////
const initialState: pageState = {
  currentPage: 1,
  employeeDetailModal: {
    employeeData: {
      id: 0,
      name: "",
      department: "",
      salary: 0,
    },
    showModal: { employeeDetail: false, deleteEmployee: false },
  },
};

/////////// state Functions //////////

const slice = createSlice({
  name: "pages",
  initialState: initialState,
  reducers: {
    increaseCurrentPage: (state, maximumPage): void => {
      if (state.currentPage < maximumPage.payload) {
        state.currentPage += 1;
      }
    },
    decreaseCurrentPage: (
      state,
      minimumPage: {
        payload: any;
        type: string;
      }
    ): void => {
      if (state.currentPage > minimumPage.payload) {
        state.currentPage -= 1;
      }
    },
    setCurrentPage: (
      state,
      currentPage: {
        payload: number;
        type: string;
      }
    ): void => {
      state.currentPage = currentPage.payload;
    },
    showEmployeeModal: (
      state,
      ModalData: {
        payload: {
          employeeData: pageState["employeeDetailModal"]["employeeData"];
          modalType: "employeeDetail" | "deleteEmployee";
        };
        type: string;
      }
    ): void => {
      state.employeeDetailModal = {
        employeeData: ModalData.payload.employeeData,
        showModal: {
          employeeDetail: ModalData.payload.modalType == "employeeDetail",
          deleteEmployee: ModalData.payload.modalType == "deleteEmployee",
        },
      };
    },
    hideEmployeeModal: (state): void => {
      state.employeeDetailModal.showModal =
        initialState.employeeDetailModal.showModal;
    },
  },
});

export default slice.reducer;

export const {
  increaseCurrentPage,
  decreaseCurrentPage,
  setCurrentPage,
  showEmployeeModal,
  hideEmployeeModal,
} = slice.actions;
