import logo from './logo.svg';
import './App.css';
import RoutingModule from './RoutingModule';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <div className="App">
      <RoutingModule/>
      <ToastContainer/>
    </div>
  );
}

export default App;
