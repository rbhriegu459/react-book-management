import {Routes, Route} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import BookComponent from './components/BookComponent';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/books/:id" element={<BookComponent/>}/>
      </Routes>
    </div>
  );
}

export default App;
