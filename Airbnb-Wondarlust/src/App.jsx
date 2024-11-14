// import './App.css'
import { CreateNewHome } from "./CreateNewHome";
import { Footer } from "./Footer";
import NavaBar from "./NavBar";
import { Propertylisting } from "./Propertylisting";
import { PropertyDetails } from "./PropertyDetails";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
function App() {
  return (
    <>
      <NavaBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Propertylisting />}></Route>
          <Route path="/AddNewHome" element={<CreateNewHome />}></Route>
          <Route path="/HomeDetails/:id" element={<PropertyDetails />}></Route>
        </Routes>
      </BrowserRouter>

      <Footer />
    </>
  );
}

export default App;
