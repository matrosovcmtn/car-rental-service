import './App.css'
import MainPage from './pages/MainPage';
import CarsList from './components/CarsList/CarsList';
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import AdminLayout from './pages/AdminLayout';

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<MainPage/>}/>
        <Route path='/carslist' element = {<CarsList/>}/>
        <Route path='/admin' element = {<AdminLayout/>}>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
