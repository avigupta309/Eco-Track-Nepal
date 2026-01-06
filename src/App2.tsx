import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Test } from "./test";
import { HomePage } from "./pages/HomePage";
import Reportz from "./pages/Report/Reportz";

export const Appz = () => {
  return (
    <>
      <div className="">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reports" element={<Reportz />} />
        <Route path="/login" element={<Test />} />
      </Routes>
    </>
  );
};
