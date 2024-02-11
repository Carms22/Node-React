import { Route, Routes, } from 'react-router-dom';
import RegisterPage from './pages/Register/Register';
import ProtectedRoute from './components/misc/ProtectedRoute';
import Login from './pages/Login/LoginPage';
import PostFormPage from './pages/Posts/PostFormPage'
import UserDetailScreen from './pages/UserDetail';

function App() {

  return (

        <Routes>
          <Route path='/hom' element={ <h1>Home page</h1> }/>
          <Route path='/register' element={<RegisterPage values/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/profile' 
            element={
              <ProtectedRoute>
                <UserDetailScreen/>
              </ProtectedRoute>
          }/>
          <Route path='/posts' element={<PostFormPage/>}/>
          <Route path='/posts/:id' element={<h1>post id</h1>}/>
          <Route path='/add-post' element={<h1>add-post</h1>}/>
          <Route path='/comment' element={<h1>comment</h1>}/>
          <Route path='/' element={<h1>Home page</h1>}/>
        </Routes>


  )
}

export default App