import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Books from './pages/Books';
import Add from './pages/Add';
import Update from './pages/Update';
import Delete from './pages/Delete';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Books/>}/>
          <Route path='/add' element={<Add/>}/>
          <Route path='/update/:id' element={<Update/>}/>
          <Route path='/delete/:id' element={<Delete/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;