import Home from './components/Home';
import SeminarDetails from './components/SeminarDetails';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/**
 * Перенаправляем на список семинаров или на отдельный семинар если нужно
 */
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/seminars/:id" element={<SeminarDetails />} />
      </Routes>
    </Router>
  )
}

export default App