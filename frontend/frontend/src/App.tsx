import './App.css';
import Header from './components/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PlayingField from './pages/PlayingField';
import Result from './pages/Result';

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path={`/`} element={<Home />} />
          <Route path={`/playingfield`} element={<PlayingField />} />
          <Route path={`/result`} element={<Result />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
