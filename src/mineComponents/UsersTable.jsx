import React from 'react'
import { useEffect, useState } from 'react'
import supabase from '../supabase'
import supabaseAdmin from '../supabaseadmin'
import { MdDelete } from "react-icons/md";

const UsersTable = () => {
    const [users,setUsers] = useState([])

  async function getUserInfo(){
    const usersData = await supabase.from('profiles').select('*')
    setUsers([...usersData.data]);
  }

  useEffect(()=>{
    getUserInfo()
  },[])

  function handelDelectAccount(userid){
     const delectaccount = async ()=>{
      await supabaseAdmin.auth.admin.deleteUser(userid);
         alert('user deleted')
         
      }  
     delectaccount()
     getUserInfo()
  }


  return (
    <div className='userTable'>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.length>0?users.map((user) => {
          
           if(user.role !=='admin'){
             return(
             <tr key={user.id}>
               <td>{user.name}</td>
               <td>{user.role}</td>
               <td>{user.email}</td>
               <td><button onClick={()=>handelDelectAccount(user.id)} className='delectAccountBtn'><MdDelete /></button></td>
             </tr>
            )
          }
        }):
          <tr>
            <td>
              loading...
            </td>
          </tr>
          
          }
        </tbody>
      </table>
    </div>
  )
}

export default UsersTable
