
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Urlpage from "./Pages/Urlpage";
import Homepage from "./Pages/HomePage";
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/url" element={<Urlpage/>}/>
      </Routes>
    </Router>

  );
}

export default App;
