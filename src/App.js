import { Box } from '@chakra-ui/react';
import './App.css';
import Navbar from './Components/Navbar';
import Footer from './pages/Footer';
import AllRouting from './Router/AllRouting';

function App() {
  return (
    <div className="App">
      <Navbar />  
      <AllRouting/>
      <Box h={1} bg='white' ></Box>
      <Footer/>
      <Box h={4} bg='#2c022cf3' ></Box>
    </div>
  );
}

export default App;
