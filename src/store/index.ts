import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import employees from "./employees";

const reducer = combineReducers({
  allEmployees: employees,
});

const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          "your/action/type",
          "http://localhost:3000/employee/fulfilled",
        ],
        // Ignore these field paths in all actions
        ignoredActionPaths: [
          "meta.arg",
          "payload.headers",
          "payload.config.transformRequest.0",
        ],
        // Ignore these paths in the state
        ignoredPaths: ["payload.headers", "payload.config.transformRequest.0"],
      },
    }),
  reducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
