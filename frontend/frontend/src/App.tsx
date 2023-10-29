import './App.css';
import Header from './components/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Play from './pages/Play';
import Data from './pages/Data';
import Signup from './pages/Signup'

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path={`/`} element={<Home />} />
          <Route path={`/play/:length?`} element={<Play />} />
          <Route path={`/data`} element={<Data />} />
          <Route path={`/signup`} element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
