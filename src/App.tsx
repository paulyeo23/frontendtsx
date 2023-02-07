import "./App.css";

import NavBar from "./Components/NavBar/NavBar";
import { AllEmployeesPage } from "./Components/HomePage/AllEmployeesPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { EmployeePage } from "./Components/EmployeeForms/EmployeePage";

function App() {
  return (
    <html>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
        integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <body>
        <NavBar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AllEmployeesPage />} />
          </Routes>
          <Routes>
            <Route
              path="/employee/:employeeId?/:employeeName?"
              element={<EmployeePage />}
            />
          </Routes>
        </BrowserRouter>
      </body>
    </html>
  );
}

export default App;
