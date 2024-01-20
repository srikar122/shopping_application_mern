import './App.css';
import Navigation from './components/navi/Navigation' 
import {Route,Routes} from 'react-router-dom'
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import Contact from './components/contactus/Contact';
import Home from './components/home/Home';
import UserDashboard from './components/UserDashboard/UserDashboard';
import Cart from './components/cart/Cart';
import Search from './components/search/Search';
import Recommend from './components/recommend/Recommend';
function App() {
  return (
    <div className="App">
      <Navigation/>


      <Routes>
        <Route path='' element={<Home/>}/>
        <Route path='home' element={<Home/>}/>
        <Route path='signup' element={<Signup/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='contact' element={<Contact/>}/>
        <Route path='search' element={<Search/>}/>
        <Route path='recommend' element={<Recommend/>}/>
        <Route path='userDashboard' element={<UserDashboard/>}>
          <Route path='cart' element={<Cart/>}></Route>
        </Route>

      </Routes>

    </div>
  );
}

export default App;
