import '../app.css'
import { Link, Outlet } from 'react-router-dom'

const Admin = () => {


  return (
    <div>
        <h2 className='Admin_title'>Admin Dashboard</h2>
        <hr />

        <div className='adminContiner'>
          <div className="AdminSideNav">
            <Link to={'/Admin/'} className='links'>Users Table</Link>
            <Link to={'/Admin/addteacher'} className='links' >Create Teacher Account</Link>
          </div>
          <div className='AdminInfoDiv'>
            <Outlet />
          </div>
        </div>
    </div>
  )
}

export default Admin;
