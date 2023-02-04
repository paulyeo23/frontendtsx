import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import employees from "./employeeCrud";
import pages from "./pages";

const reducer = combineReducers({
  employeeCrud: employees,
  pageState: pages,
});

const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      // serializableCheck: {
      //   // Ignore these action types
      //   ignoredActions: [
      //     "your/action/type",
      //     "http://localhost:3001/employee/fulfilled",
      //     "/get/fulfilled",
      //   ],
      //   // Ignore these field paths in all actions
      //   ignoredActionPaths: [
      //     "meta.arg",
      //     "payload.headers",
      //     "payload.config.transformRequest.0",
      //   ],
      //   // Ignore these paths in the state
      //   ignoredPaths: ["payload.headers", "payload.config.transformRequest.0"],
      // },
    }),
  reducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
