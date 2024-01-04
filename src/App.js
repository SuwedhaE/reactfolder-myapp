import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import BasicInfo from "./ui/BasicInfo";
import AddressInfo from "./ui/AddressInfo";
import { Route, Routes } from "react-router-dom";
import Home from "./ui/Home";
import EditInfo from "./ui/EditInfo";

function App() {
  return (
    <div className="App">
      <Header />
      <h1>Hoc Project</h1>
      <Routes>
        <Route exact path="/" element={<Home />} />
        {/* <Route path="/adduser" element={<UserDataForm />} />
        <Route path="/edituser/:id" element={<UserDataForm />} /> */}
        <Route path="/addinfo" element={<BasicInfo />} />
        <Route path="/addressinfo/add/:fullName/:email/:phone" element={<AddressInfo />} />
        {/* <Route path="/addressinfo/add" element={<AddressInfo />} /> */}
        <Route path="/editinfo/:id" element={<EditInfo />} />
      </Routes>
    </div>
  );
}

export default App;
