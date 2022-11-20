import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Customer from './Pages/Customer';
import Home from './Pages/Home'
import Platform from './Pages/Platform';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path='/customer' element={<Customer />} />
          <Route exact path='/platform' element={ <Platform/> } />
          <Route path="*" element={<p>Page Not Found</p>} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
