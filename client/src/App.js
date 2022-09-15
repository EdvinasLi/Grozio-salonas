import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Saloons from "./pages/admin/Saloons/Saloons";
import SaloonsNew from "./pages/admin/Saloons/New";
import ServicesNew from "./pages/admin/Services/New";
import MainContext from "./context/MainContext";
import Header from "./components/Header/Header";
import Edit from "./pages/admin/Saloons/Edit";
import Alert from "./components/Alert/Alert";
import ServicesList from "./pages/admin/Services/Services";
import ServicesEdit from "./pages/admin/Services/Edit";
import WorkersList from "./pages/admin/Workers/Workers";
import WorkersEdit from "./pages/admin/Workers/Edit";
import NewWorker from "./pages/admin/Workers/New";

function App() {
  const [alert, setAlert] = useState({
    message: "",
    status: "",
  });
  const contextValues = {
    alert,
    setAlert,
  };
  return (
    <BrowserRouter>
    

      <MainContext.Provider value={contextValues}>
      <Header/>
        <div className="container">
          <Alert />
          <Routes>
            <Route path="admin">
            <Route index element={<Saloons />} />
              <Route path="saloons/new" element={<SaloonsNew />} />
              <Route path="saloons/edit/:id" element={<Edit />} />
              <Route path="services/new" element={<ServicesNew />} />
              <Route path="services" element={<ServicesList />} />
              <Route path="services/edit/:id" element={<ServicesEdit />} />
              <Route path="workers" element={<WorkersList />} />
              <Route path="workers/edit/:id" element={<WorkersEdit />} />
              <Route path="workers/new" element={<NewWorker />} />

              
              
            </Route>
          </Routes>
        </div>
      </MainContext.Provider>
    </BrowserRouter>
  );
}

export default App;
