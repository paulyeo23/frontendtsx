import React from "react";
import logo from "./logo.svg";
import "./App.css";

import NavBar from "./Components/NavBar/NavBar";
import EmployeeCell from "./Components/HomePage/EmployeeCells/EmployeeCell";
import { AllEmployeesPage } from "./Components/HomePage/AllEmployeesPage";

function App() {
  return (
    <html>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
        integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
        crossOrigin="anonymous"
      />
      <body>
        <NavBar />
        <AllEmployeesPage />
      </body>
    </html>
  );
}

export default App;
