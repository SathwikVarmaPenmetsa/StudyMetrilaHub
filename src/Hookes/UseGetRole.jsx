import React, { useState } from 'react'
import supabase from '../supabase'

const UseGetRole =  () => {

    const [userName,SetUserName] = useState('');
    const [role,setRole] = useState('')

   const getrole =  async () =>{
        const {data,error} = await supabase.auth.getUser()
        if(error){
            console.log('error in geting user info');
        }
        const userid = data.user.id;
        const {data : profileData,error:profileError} = await supabase.from('profiles').select('*').eq('id', userid).single() 
        if(profileError){
            console.log('error in geting profile data',profileError); 
        }
        SetUserName(profileData.name);
        setRole(profileData.role);
   }

   getrole()

  return {userName,role}
}

export default UseGetRole
