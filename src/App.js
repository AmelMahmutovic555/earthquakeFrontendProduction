import './index.css';
import {BrowserRouter, Routes, Route} from "react-router"
import Header from './components/Header';
import EarthquakeMapInfo from './components/EarthquakeMapInfo';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Header/>}/>
          <Route path='/earth' element={<EarthquakeMapInfo/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
