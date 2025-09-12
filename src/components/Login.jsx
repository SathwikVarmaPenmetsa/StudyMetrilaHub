import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import supabase from '../supabase'
import SideTextForLogin from '../mineComponents/SideTextForLogin'
import WalkingAnime from '../mineComponents/WalkingAnime'

const Login = () => {
  const navigate = useNavigate()
  
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  
   const [errorMsg, setErrorMsg] = useState("");

  const handelSignin = async () => {
        setErrorMsg('')
    try {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
         if (error) {
            if (error.message === "Invalid login credentials") {
              setErrorMsg("❌ Wrong email or password!");
            } else {
              setErrorMsg(error.message);
            }
         }
    }catch (err) {
        console.error("Request failed:", err);
    }

    

  }


  return (
    <div className='loginpagediv'>

        <div className='signupdivTitle'>
            <SideTextForLogin />
        </div>

        <div className='signupdivform'>
            <h1 className='gradient-title title-none' >
            StudyMetrilaHub
            </h1>
          
          <div className='signupdivforminputs'>
            <div className='Walkinganimestyle'>
            <WalkingAnime />
          </div>
            <h2>Login</h2>
            <input type="email" placeholder='enter your Email' name='email' onChange={(e)=>setEmail(e.target.value)} />
      
            <input type="password" name="password" placeholder='password...' onChange={(e)=>setPassword(e.target.value)} />
          
            {errorMsg && (
              <p>{errorMsg}</p>
            )}
            <button onClick={handelSignin}>Login</button>
            <p>--------------------------------------</p>
            <p>i don't have account ? <span onClick={()=>navigate('/signup')} style={{color:'blue',cursor:'pointer'}}>signUp</span></p>
            <p onClick={()=>navigate('/changepassowrd')} style={{color:'blue',cursor:'pointer'}}>Forgotten password?</p>
          </div>

        </div>
    </div>
  )
}

export default Login
