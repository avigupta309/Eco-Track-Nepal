import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { HomePage } from "./pages/HomePage";
import { ReportList } from "./pages/Report/ReportList";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
// import EnterPage from "./a";

export const App = () => {
  return (
    <>
      <div className="">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reports" element={<ReportList />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage/>}/>
        {/* <Route path="/signup2" element={<EnterPage/>}/> */}
      </Routes>
    </>
  );
};
