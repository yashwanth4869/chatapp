import logo from './logo.svg';
import './styles.scss'
import Register from './pages/Register';
import Login from './pages/Login'
import Home from './pages/Home'
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {

  const {curruser} = useContext(AuthContext)
  const ProtectedRoute = ({children}) =>{
    if(!curruser){
      return <Navigate to = '/login'/>
    }
    return children
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/">
          <Route index element = {<ProtectedRoute><Home/></ProtectedRoute>}/>
          <Route path = "login" element={<Login/>}/>
          <Route path = "register" element={<Register/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
