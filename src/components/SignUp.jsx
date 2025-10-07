import React, {  useState } from 'react'
import { useNavigate } from 'react-router-dom';
import supabase from '../supabase';
import SideTextForLogin from '../mineComponents/SideTextForLogin';
import WalkingAnime from '../mineComponents/WalkingAnime';

const SignUp = () => {
   const navigate = useNavigate()
    const [username,setUserName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [errorMessage,SetErrorMessage] = useState({
        usernameError:"",
        emailError:"",
        passwordError:""
    })

    const handlesignUp = async () =>{


        const validateEmail = (email) => {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        };

        

        const validatePassword = (password) => {
            const passwordRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/;
            return passwordRegex.test(password);
        };


        if(!username){
            SetErrorMessage(prev=>{
                return {...prev,usernameError:'enter your Name'}
            })
        }else if(!email){
            SetErrorMessage(prev=>{
                return {...prev,emailError:'enter your email',usernameError:''}
            })
        }else if(!validateEmail(email)){
            SetErrorMessage(prev=>{
                return {...prev,emailError:'Please enter a valid email address. ',usernameError:''}
            })
        }else if(!password){
            SetErrorMessage(prev=>{
                return {...prev,emailError:'',usernameError:'',passwordError:'create password'}
            })
        }else if(!validatePassword(password)){
            SetErrorMessage(prev=>{
                return {...prev,emailError:'',usernameError:'',passwordError:'Password must be 8+ chars with uppercase, lowercase, number & special character.'}
            })
        }
        else{ 
             SetErrorMessage(prev=>{
                return {...prev,emailError:'',usernameError:'',passwordError:''}
            })
            const {data,error} = await supabase.auth.signUp({
                email,
                password,
            })
            if(error){
                console.log('signup error',error);
                
            }
            const user = data.user;
            if(user){
                const {error : profileError} = await supabase.from('profiles').insert([
                    { id: user.id, role: "student", name:username,email:email }
                ])
                if(profileError){
                    console.log('error in insert data to profiles table');
                }
            }
        }


    }


  return (
      <div className='signuppageDiv'>

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
                <h2>Create Student Account</h2>
                <p>It's quick and easy.</p>
                <input type="text" placeholder='userName' onChange={(e)=>setUserName(e.target.value)}/>
                {errorMessage.usernameError? <span>{errorMessage.usernameError}</span>:null}
                <input type="email" placeholder='enter your Email' name='email' onChange={(e)=>setEmail(e.target.value)} />
                {errorMessage.emailError? <span>{errorMessage.emailError}</span>:null}
                <input type="password" name="password" placeholder='create password...' onChange={(e)=>setPassword(e.target.value)} />
                {errorMessage.passwordError? <span>{errorMessage.passwordError}</span>:null}
                <p>By clicking Sign Up, you agree to our Terms, Privacy Policy and Cookies Policy. You may receive SMS notifications from us and can opt out at any time.</p>
                <button onClick={handlesignUp}>signUp</button>
                <p>--------------------------------------------</p>
                <p onClick={()=>navigate('/')} style={{color:'blue',cursor:'pointer'}}><u>i already have account ?</u> </p>
                
            </div>
        </div>

    </div>
  )
}

export default SignUp;
