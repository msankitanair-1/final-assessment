import Home from "./components/Home";
import Add from "./components/Add";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/add/:id" element={<Add />} />   {/* for UPDATE */}
      </Routes>
    </>
  );
}

export default App;