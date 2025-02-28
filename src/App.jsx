import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Explorer from "./pages/Explorer";
import Upload from "./pages/Upload";
import MemeDetails from "./pages/MemeDetails";
import Navbar from "./components/Navbar";
import UserProfile from "./pages/UserProfile";
import Leaderboard from "./pages/Leaderboard";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explorer" element={<Explorer />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/meme/:id" element={<MemeDetails />} />  {/* Dynamic Route */}
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="*" element={<NotFound />} /> {/* 404 Page */}
      </Routes>
    </Router>
  );
}

export default App;
