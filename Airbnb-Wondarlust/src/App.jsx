// import './App.css'
import { useState } from "react";
import { CreateNewHome } from "./CreateNewHome";
import { Footer } from "./Footer";
import NavaBar from "./NavBar";
import { Propertylisting } from "./Propertylisting";
import { PropertyDetails } from "./PropertyDetails";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Usersignup } from "./userSignup";
import { Login } from "./Login";
import { EditHome } from "./EditHome";
function App() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
      {/* <Map_Coordinates />
      <File_upload /> */}
      <NavaBar setSearchTerm={setSearchTerm} />
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Propertylisting searchTerm={searchTerm} />}
            ></Route>
            <Route
              path="/:search"
              element={<Propertylisting searchTerm={searchTerm} />}
            ></Route>
            <Route path="/AddNewHome" element={<CreateNewHome />}></Route>
            <Route path="/EditHome/:id" element={<EditHome />}></Route>
            <Route
              path="/HomeDetails/:id"
              element={<PropertyDetails />}
            ></Route>
            <Route path="/usersignup" element={<Usersignup />}></Route>
            <Route path="/Login" element={<Login />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </>
  );
}

export default App;
