import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Match from "./pages/Match";
import Rank from "./pages/Rank";
import Stat from "./pages/Stat";
import Player from "./pages/Player";
import DetailMatch from "./pages/DetailMatch";
import Club from "./pages/Club";
import DetailPlayer from "./pages/DetailPlayer";
import DetailClub from "./pages/DetailClub";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="match" element={<Match />} />
        <Route path="rank" element={<Rank />} />
        <Route path="stat" element={<Stat />} />
        <Route path="player" element={<Player />} />
        <Route path="club" element={<Club />} />
        <Route path="detailmatch/:id" element={<DetailMatch />} />
        <Route path="detailplayer/:id" element={<DetailPlayer />} />
        <Route path="detailclub/:id" element={<DetailClub />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
