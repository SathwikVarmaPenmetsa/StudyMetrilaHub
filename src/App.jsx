import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import PdfCards from './components/PdfCards'
import Uplode from './components/Uplode'
import Admin from './components/Admin'
import About from './components/About'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import SignUp from './components/SignUp'
import SignUpProtectedRouting from './components/SignUpProtectedRouting'
import ChangePassword from './components/ChangePassword'
import UpdatePassword from './components/UpdatePassword'
import UseIsLogin from './Hookes/UseIsLogin'
import UseGetRole from './Hookes/UseGetRole'
import UsersTable from './mineComponents/UsersTable'
import AddteacherAccount from './mineComponents/AddteacherAccount'


function App() {
  const isLogin = UseIsLogin()
  const {userName,role} = UseGetRole()

  return (
    <div>

      {isLogin? <Navbar isLogin={isLogin} role={role}   userName={userName} /> : null}

      <Routes>
          {isLogin ? <Route path='/' element={<PdfCards />} />: <Route path='/' element={<Login />} />}

          <Route path='/signup' element={
            <SignUpProtectedRouting isLogin={isLogin}>
              <SignUp />
            </SignUpProtectedRouting>
          } />

          <Route path='/changepassowrd' element={
              <ChangePassword />
          } />

          <Route path='/updatepassword' element={
              <UpdatePassword />
          } />

        <Route path='/pdfcards' element={
          <ProtectedRoute isLogin={isLogin} role={role}   >
            <PdfCards />
          </ProtectedRoute>
          } />

        <Route path='/Uplode' element={
          <ProtectedRoute isLogin={isLogin} role={role} allowedRoles={['teacher','admin']}  >
            <Uplode />
          </ProtectedRoute>
        } />

        <Route path='/Admin' element={
          <ProtectedRoute isLogin={isLogin} role={role} allowedRoles='admin'  >
            <Admin />
          </ProtectedRoute>
          } >
              <Route path='/Admin/' element={
                <ProtectedRoute isLogin={isLogin} role={role} allowedRoles='admin'  >
                  <UsersTable />
                </ProtectedRoute>
              } />

              <Route path='/Admin/addteacher' element={
                <ProtectedRoute isLogin={isLogin} role={role} allowedRoles='admin'  >
                  <AddteacherAccount />
                </ProtectedRoute>
              } />
        </Route>

        <Route path='/Admin/usertable' element={
          <ProtectedRoute isLogin={isLogin} role={role} allowedRoles='admin'  >
            <UsersTable />
          </ProtectedRoute>
          } 
        />
        
        <Route path='/About'element={
          <ProtectedRoute isLogin={isLogin} role={role} allowedRoles={['teacher','admin','student']}  >
            <About />
          </ProtectedRoute>
          }  />
      </Routes>
      
    </div>
  )
}

export default App
