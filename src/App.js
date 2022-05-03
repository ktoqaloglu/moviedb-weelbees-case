import Homepage from "./pages/Homepage";
import MovieSingle from "./pages/MovieSingle";
import Navbar from "./components/Navbar";
import { Routes, Route } from 'react-router-dom';
import Footer from "./components/Footer";
import People from "./pages/People";
import Tv from "./pages/Tv";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route exact path="/" element={<Homepage/>} />
        <Route exact path="/movie/:movie_id" element={<MovieSingle/>} />
        <Route exact path="/person/:person_id" element={<People />} />
        <Route exact path="/tv/:tv_id" element={<Tv />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
