import './App.css';
import AppBar from './components/Appbar';
import Client from './components/Client';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'



function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} >
    <div className="App">
    
     <AppBar/>
     
     <Client/>
   
    </div>
    </LocalizationProvider>
  );
}

export default App;
