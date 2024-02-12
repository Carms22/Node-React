import { Route, Routes, } from 'react-router-dom';
import RegisterPage from './pages/Register/Register';
import ProtectedRoute from './components/misc/ProtectedRoute';
import Login from './pages/Login/LoginPage';
import PostFormPage from './pages/Posts/PostFormPage'
import UserDetailScreen from './pages/UserDetail';
import MyHome from './pages/MyHome'
import Home from './pages/Home'

function App() {

  return (
        
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/register' element={<RegisterPage values/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/user/:id' 
            element={ 
              <ProtectedRoute>
                <MyHome/>
              </ProtectedRoute>
          }/>
          <Route path='/profile' 
            element={
              <ProtectedRoute>
                <UserDetailScreen/>
              </ProtectedRoute>
          }/>
          <Route path='/user/:id/posts' 
            element={
              <ProtectedRoute>
                <PostFormPage/>
              </ProtectedRoute>
            }/>
          <Route path='/posts/:id' element={<h1>post id</h1>}/>
          <Route path='/comment' element={<h1>comment</h1>}/>
        </Routes>


  )
}

export default App