import { Route, Routes, } from 'react-router-dom';
import RegisterPage from './pages/Register/Register';
import ProtectedRoute from './components/misc/ProtectedRoute';
import Login from './pages/Login/LoginPage';
//import LoginPage from './pages/Login/LoginPage';

////////////LOGINPAGE meter cuando funcione

function App() {

  return (

        <Routes>
          <Route path='/hom' element={
            <ProtectedRoute>
          <h1>Home page</h1>
          </ProtectedRoute>
          }

          />
          <Route path='/register' element={<RegisterPage values/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/profile' 
            element={
            
              <h1>profile</h1>
    
          }/>
          <Route path='/post' element={<h1>post</h1>}/>
          <Route path='/post/:id' element={<h1>post id</h1>}/>
          <Route path='/add-post' element={<h1>add-post</h1>}/>
          <Route path='/comment' element={<h1>comment</h1>}/>
          <Route path='/' element={<h1>Home page</h1>}/>
        </Routes>


  )
}

export default App