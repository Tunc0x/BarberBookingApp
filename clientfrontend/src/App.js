import './App.css';
import AppBar from './components/Appbar';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'




function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} >
    <div className="App">
    
     <AppBar/> 
     
     
   
    </div>
    </LocalizationProvider>
  );
}

export default App;
